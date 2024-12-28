function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "John", age: 30 });
    }, 1000);
  });
}

async function getUserData() {
    try {
        console.log('Fetching user data...');
        const userData = await fetchUserData().then((data) => console.log(data));
        console.log('Fetched user data');
    }
    catch (error) {
        console.log('Error fetching user data');
        console.log(error);
    }
}

getUserData();
