const user = { name: 'John', address: { city: 'Berlin' } };
console.log(user.address?.city); // Berlin
console.log(user.contact?.phone); // undefined
