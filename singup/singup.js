async function signup(){
    const response = await axios.post(obj,'http://localhost:3000/singup/');
    return response.data;
}


const form = document.querySelector('#form');
const submit = form.querySelector('#submit');
submit.addEventListener('click',singup)