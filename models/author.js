const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

AuthorSchema.virtual("name").get(function() {
    let fullname = "";
    //if author has first and last name
    if(this.first_name && this.family_name){
        fullname =  this.first_name + " " + this.family_name;
    }

    return fullname;
})

AuthorSchema.virtual("url").get(function() {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function() {
    if(this.date_of_birth && this.date_of_death){
        return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}`
    }
    else if(this.date_of_birth){
        return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} -`
    }
    else{
        return "-"
    }
});

//create model and export it
module.exports = mongoose.model("Author", AuthorSchema);