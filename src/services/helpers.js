function cutTitle(title) {
  const arr = title.split(' ', 4);
  if (title.split(' ') <= 5) {
    return title;
  }
  return `${arr.join(' ')}...`;
}

function cutDescription(description, numberOfWords) {
  const arr = description.split(' ', numberOfWords);
  if (description.length <= 120) return description;
  return `${arr.join(' ')}...`;
}


function dataReform(data){
  if(data === ""){
    return "";
  }
const inputDate =  new Date(data);
const day = inputDate.getDate();
const monthIndex = inputDate.getMonth();
const year = inputDate.getFullYear();
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
return formattedDate;
}
export { cutTitle, cutDescription, dataReform };