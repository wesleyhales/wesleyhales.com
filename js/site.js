function twitterCallback3(twitters) {
    var statusHTML = [];
    //var ls = 'localStorage' in window && window['localStorage'] !== null;
    for (var i=0; i<twitters.length; i++){
        var username = twitters[i].user.screen_name;
        var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'">'+url+'</a>';
        }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
                return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
            });
        statusHTML.push('<li><div>'+status+'</div><div class="actions"><a href="http://twitter.com/'+username+'/statuses/'+twitters[i].id_str+'">'+relative_time(twitters[i].created_at)+'</a>|<a class="tweet_action tweet_retweet" href="http://twitter.com/intent/retweet?tweet_id='+twitters[i].id_str+'"><img src="//si0.twimg.com/images/dev/cms/intents/icons/retweet.png">retweet</a>|<a class="tweet_action tweet_reply" href="http://twitter.com/intent/tweet?in_reply_to='+twitters[i].id_str+'"><img src="//si0.twimg.com/images/dev/cms/intents/icons/reply.png">reply</a></div></li>');
    }
    document.getElementById('twitter_update_list').innerHTML = statusHTML.join('');
}

// my custom JS

//get a request pramaeter
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//reckless abandon - adding querySelector as an option to getElementById
var orig = document.getElementById;
document.getElementById = function(){
    if (document.querySelector){
        return document.querySelector('#' + arguments[0]);
    }else{
        return orig(arguments[0]);
    }
}

//navigation based on above method... could be better
if(getParameterByName("p") == "design"){
    document.getElementById('design').className = 'selected';
} else if(getParameterByName("p") == "projects"){
    document.getElementById('projects').className = 'selected';
} else if(getParameterByName("p") == "contact"){
    document.getElementById('contact').className = 'selected';
} else {
    document.getElementById('home').className = 'selected';
}

//-----------------------------------------/end nav