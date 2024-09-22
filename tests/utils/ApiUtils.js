class ApiUtils {
    constructor(context,payload){
        this.context=context;
        this.payload =payload;

    }
    async getToken(context,payload) {

        const response = await this.context.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.payload }
        );

        const json = await response.json();
        let token = await json.token;
        console.log(token);
        return token;

    }



}

module.exports = ApiUtils; 