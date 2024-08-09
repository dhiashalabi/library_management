
export interface Library{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Library Name : Data	*/
	library_name: string
	/**	Library Code : Data	*/
	library_code: string
	/**	Status : Select	*/
	status: "Active" | "Inactive"
}