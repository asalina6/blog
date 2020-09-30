class authAPI{
    constructor(){
        this.instance = null;
    }

    createInstance(){
        let newInstance = new authAPI();
        return newInstance;
    }
    
    return
        {
            getInstance: function (instance){
                if(!instance){
                    instance = createInstance();
                }
                return instance;
            }
    };
}

export default authAPI;