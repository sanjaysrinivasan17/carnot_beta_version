#!/bin/bash

###################################################################
#Script Name	  : build_push_docker_image
#Description	  :
                # This script shows how to build the Docker image and push it to ECR to be ready for use
                # The argument to this script is the image name. This will be used as the image on the local
                # machine and combined with the account and region to form the repository name for ECR.
#Args           :
#Author       	: Preetam Balijepalli
#Email         	:
###################################################################


set -o errexit    # abort script at first error
set -o pipefail   # return the exit status of the last command in the pipe
set -o nounset    # treat unset variables and parameters as an error

image=$1
tag=$2
docker_file=$3

if [ "$image" == "" ]
then
    echo "Usage: $0 <image-name>"
    exit 1
fi

# Check if aws cli is available
type aws >/dev/null 2>&1 || { echo >&2 "The aws cli is required for this script to run."; exit 1; }

# Get the account number associated with the current IAM credentials
account=$(aws sts get-caller-identity --query Account --output text)

if [ $? -ne 0 ]
then
    exit 255
fi

# Get the region defined in the current configuration (default to us-east-1 if none defined)
# $(aws configure get region) only gives the value set in the config file
# whereas below mechanism allows user to fetch from AWS_DEFAULT_REGION
region=$(aws configure list | grep region | awk '{print $2}')

fullname="${account}.dkr.ecr.${region}.amazonaws.com/${image}:${tag}"

echo "$fullname"

# If the repository doesn't exist in ECR, create it.
aws ecr describe-repositories --repository-names "${image}" || aws ecr create-repository --repository-name "${image}"

# Get the login command from ECR and execute it directly
aws ecr get-login-password --region "${region}" | docker login --username AWS --password-stdin "${account}".dkr.ecr."${region}".amazonaws.com

# Build the docker image locally with the image name and then push it to ECR
# with the full name.

# docker build
# cat "${docker_file}"
docker build  -t "${image}" -f "${docker_file}" .

# docker tag
docker tag "${image}" "${fullname}"

# docker push
docker push "${fullname}"

echo "docker pushed to the repo"

# Check if jq is available
type jq >/dev/null 2>&1 || { echo >&2 "The jq utility is required for this script to run."; exit 1; }

images_to_delete=$( aws ecr list-images --region "${region}" --repository-name "${image}" --filter "tagStatus=UNTAGGED" --query 'imageIds[*]' --output json )

echo "$images_to_delete"

aws ecr batch-delete-image --region "${region}" --repository-name "${image}" --image-ids "$images_to_delete" || true


# KEEP_IMAGES=2 # number of images you want to remain

#aws ecr describe-images --repository-name "${image}"  --query 'imageDetails[]' \
#    | jq --raw-output 'sort_by(.imagePushedAt) | reverse | .[].imageDigest' \
#    | awk "NR > ${KEEP_IMAGES}" \
#    | xargs -I{} aws ecr --region "${region}" batch-delete-image --repository-name "${image}"  --image-ids imageDigest={}
