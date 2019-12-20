// document.querySelector('.delete-link').addEventListener('click', async(event) => {
//     console.log('>>>');
//     if (event.target.innerText === 'Удалить') {
//         event.preventDefault();
//         event.stopPropagation();
//         console.log(event.target.id);
//         await fetch(`/events/${event.target.id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 id: event.target.id,
//             })
//         });
//         window.location = 'http://localhost:3001/events';
//     }
// });

const buttons = document.querySelectorAll('.delete-link');
buttons.forEach(item => {item.addEventListener('click', async(event) => {
    console.log('>>>');
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.id);
    await fetch(`/events/${event.target.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: event.target.id,
        })
    });
    window.location = '/events';
})});