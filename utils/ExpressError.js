class ExpressError extends Error{
    constructor(status,message)
    {
        this.status=status;
        this.message=message;
    }
}