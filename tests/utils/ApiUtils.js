class ApiUtils {
    constructor(context){
        this.context=context;

    }
    async getToken(context) {
        const payload = { userEmail: "qaatest@test.com", userPassword: "Test@123" };

        const response = await this.context.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: payload }
        );

        const json = await response.json();
        let token = await json.token;
        console.log(token);
        return token;

    }



}

module.exports = ApiUtils; 