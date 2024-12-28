function fetchPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Post fetched");
    }, 2000);
  });
}

function fetchComments() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Comments fetched");
    }, 1000);
  });
}


async function getPostData(){
    try{
        console.log("Fetching log data....");
        const blogData = await fetchPost().then((data) =>{
            // console.log('Posts fetched');
            console.log(data);
        });
        console.log("Fetching comments....")
        const commentData = await fetchComments().then((data)=> {console.log(data)});



    }catch(error){
        console.log(error);
    }

}


getPostData();