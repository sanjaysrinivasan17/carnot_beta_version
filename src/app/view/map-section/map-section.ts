export interface mapsection {

    uploaded_raw_image: any;
    mission: any;
    flight:any;
}
export class mapsectionC {
    uploaded_raw_image: any;
    mission: any;
    flight: any;

    constructor(obj?: mapsectionC) {
        this.uploaded_raw_image = (obj && obj.uploaded_raw_image) || [];
        this.mission = (obj && obj.mission) || null;
        this.flight = (obj && obj.flight) || null;
    }
}