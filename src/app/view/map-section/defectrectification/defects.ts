export interface Defects {
    id: number;
    table_no: string;
    assigned_by: string;
    assigned_to: string;
    defect_type: string;
    updated_at: string;
    assigned_date: string;
    sub_defect_type: string;
    module_no: string;
    status: string;
    files: any;
    token: any;
    sort:any;
}
export class DefectsC {
    id: number;
    table_no: string;
    module_no: string;
    assigned_by: string;
    assigned_to: string;
    defect_type: string;
    updated_at: string;
    assigned_date: string;
    sub_defect_type: string;
    status: string;
    files: any;
    token: any;
    sort: any;


    constructor(obj?: DefectsC) {
        this.id = (obj && obj.id) || null;
        this.table_no = (obj && obj.table_no) || null;
        this.module_no = (obj && obj.module_no) || null;
        this.assigned_by = (obj && obj.assigned_by) || null;
        this.assigned_to = (obj && obj.assigned_to) || null;
        this.defect_type = (obj && obj.defect_type) || null;
        this.updated_at = (obj && obj.updated_at) || null;
        this.assigned_date = (obj && obj.assigned_date) || null;
        this.sub_defect_type = (obj && obj.sub_defect_type) || null;
        this.status = (obj && obj.status) || null;
        this.files = (obj && obj.files) || [];
        this.token = (obj && obj.token) || null;
        this.sort = (obj && obj.sort) || null;
    }
}