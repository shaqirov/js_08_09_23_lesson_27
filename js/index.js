
const tbody = document.getElementById('tbodyPosts');
const url = 'http://localhost:3030/posts'
const btnRed = document.querySelector('.btn-danger')
const btnBlue = document.querySelector('.btn-success')
const xBtn = document.querySelector('.btn-close')
const modal = document.getElementById('exampleModal')

//=====================================Запрос и вывод на страницу=======================================
async function getPosts () {
    tbody.innerHTML = ""
    try {
        const response = await axios.get(url);
        response.data.forEach((el, index) => {
            tbody.innerHTML += `
                <tr>
                    <th>${index + 1}</th>
                    <td>${el.title}</td>
                    <td>${el.body}</td>
                    <td>
                        <button  data-id="${el.id}" class="deleteBtn btn btn-danger">Удалить</button>
                    </td>
                </tr>
            `
        })
        showModal()
    } 
    catch (error) {
        throw error
    }
}
getPosts()
//=======================================================================================================


//======================================Модальное окно и удаление========================================
function closeModal() {
    modal.style.display = 'none'
}

function showModal() {
    try {
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach (btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'block'
                const id = btn.dataset.id
                btnRed.setAttribute('data-id', id)
            })
        })
        btnBlue.addEventListener('click', () => {
            closeModal()
        })
        xBtn.addEventListener('click', () => {
            closeModal()
        })
    }
    catch(error) {
        throw error
    }
}

async function deletePost () {
    try {
        btnRed.addEventListener('click', async () => {
            const id = btnRed.dataset.id
            await axios.delete(url + `/${id}`)
            closeModal()
            getPosts()
        })
    }
    catch(error) {
        throw error
    }
}
deletePost()
//========================================================================================================


// async function deletePost(event) {
//     try {
//         const id = event.target.dataset.id;
//         const response = await axios.delete(url + `/${id}`)
//         getPosts()
//         return response
//     }
//     catch (error) {
//         throw error
//     }
// }