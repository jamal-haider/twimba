import { tweetsData } from './data.js'

document.addEventListener('click', function(e){

    if(e.target.dataset.reply)
        handleReplyClick(e.target.dataset.reply)


})


function handleReplyClick(tweetId){
    
}


function getFeedHTML(){
    let feedHtml = ''
    tweetsData.forEach((tweet) => {
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
                                <i class="fa-solid fa-heart"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
            `
    })

    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHTML()
}

render()