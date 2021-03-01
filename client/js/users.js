
window.addEventListener('load', (e) => {

    const usersList = fetch("http://localhost:3000/api/v1/users")
        .then(res => res.json())
        .then(data => data);

    console.log(usersList);
})
