class errorResponse extends Error{
constructor(message,StatusCode){
   super(message)
   this.StatusCode=StatusCode

}
}

module.exports = errorResponse
               