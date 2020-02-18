export class UserInformationError extends Error {

	constructor(err, userInfo){
		super(err);
		this.message = userInfo
	}
}