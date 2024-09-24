
const firstName = prompt('What is you First name?');
const lastName = prompt('What is you last name?');
const age = prompt('How old are you?');

if (Number(age) < 18) {
    alert('You are not eligible to vote');
}

console.log(firstName, typeof age);