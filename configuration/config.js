
var config = {
        url : {
            urlStart : 'https://cdn.contentstack.io/v3/content_types/',
            urlEnd : '/entries?api_key=bltd1343376dfba54d2&access_token=bltfe57b09b1e4c5732&environment=staging&locale=en-us&include_dimension=true'
        },
        headerUrl : function(){
            return this.url.urlStart +"header" +this.url.urlEnd },

        homeUrl : function(){
            return this.url.urlStart +"home" +this.url.urlEnd },

        footerUrl : function(){
            return this.url.urlStart +"footer" +this.url.urlEnd },

        faqUrl : function(){
            return this.url.urlStart +"faq" +this.url.urlEnd },

        contactUsUrl : function(){
            return this.url.urlStart +"contact_us" +this.url.urlEnd },
}



module.exports = config