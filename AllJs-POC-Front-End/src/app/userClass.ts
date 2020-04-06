export class User{
	public username: string;
	public password: string;

	constructor(u, s){
		this.username = u;
		this.password = s;
	}
}

export class NewUser{	
	public firstName: string;
	public lastName: string;
	public birthDate: string;
	public username: string;
	public password: string;
	public remember: boolean;

	constructor(f,l,b,u,p,r)
	{
		this.firstName=f;
		this.lastName=l;
		this.birthDate=b;
		this.username=u;
		this.password=p;
		this.remember=r;
	}
}