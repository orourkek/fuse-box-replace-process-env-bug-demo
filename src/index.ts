if (process.env.FOO === 'bar') {
  console.log('Yes, foo equals bar');
  var a = function() {};
  a();
} else {
  console.log('No foo is not bar');
}

if (process.env.hasOwnProperty('FOO')) {
  console.log('foo is defined');
} else {
  console.log('foo is not defined');
}

const fooDefined = process.env.hasOwnProperty('FOO');
