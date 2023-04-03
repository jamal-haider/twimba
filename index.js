import { tweetsData } from './data.js'

document.addEventListener('click', function(e){

    if(e.target.dataset.reply)
        handleReplyClick(e.target.dataset.reply)
    else if(e.target.dataset.like)
        handleLikeClick(e.target.dataset.like)
    else if(e.target.dataset.retweet)
        handleRetweetClick(e.target.dataset.retweet)
    

})


function handleReplyClick(tweetId){
    document.getElementById("replies-" + tweetId).classList.toggle('hidden')
}

function handleRetweetClick(tweetId){
    let tweetObj = findTweetByID(tweetId)
    if(tweetObj.isRetweeted)
        tweetObj.retweets--
    else
        tweetObj.retweets++
    tweetObj.isRetweeted = !tweetObj.isRetweeted
    render()
}

function handleLikeClick(tweetId){
    let tweetObj = findTweetByID(tweetId)
    if(tweetObj.isLiked)
        tweetObj.likes--
    else
        tweetObj.likes++

    tweetObj.isLiked = !tweetObj.isLiked

    render()
}


function getFeedHTML(){

    

    let feedHtml = ''
    tweetsData.forEach((tweet) => {
        const likeIconClass = tweet.isLiked ? 'liked' : ''
        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        let repliesHtml = ''
        if(tweet.replies.length > 0)
            tweet.replies.forEach((reply) => {
                repliesHtml+= `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${tweet.uuid}></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>
            `
    })

    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHTML()
}

render()


function findTweetByID(id){
    return tweetsData.find(tweet => tweet.uuid === id)
}