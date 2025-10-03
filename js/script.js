
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const filterSelect = document.getElementById('filter-select'); // Untuk filter

// 2. Event Listener untuk Form Submission
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman refresh saat form disubmit

    const todoText = todoInput.value.trim(); // Ambil teks tugas, hilangkan spasi di awal/akhir
    const todoDate = dateInput.value; // Ambil tanggal

    // **Validasi Wajib:** Pastikan input tidak kosong
    if (todoText === '' || todoDate === '') {
        alert('Tugas dan Tanggal harus diisi!');
        return; // Hentikan fungsi jika validasi gagal
    }

    // Panggil fungsi untuk menambahkan item ke daftar
    addTodoItem(todoText, todoDate);

    // Bersihkan input setelah berhasil
    todoInput.value = '';
    dateInput.value = '';
});


// 3. Fungsi untuk Membuat dan Menambahkan Item Tugas
function addTodoItem(text, date) {
    // 3A. Buat elemen <li> baru
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('data-completed', 'false'); // Status awal: belum selesai

    // 3B. Isi konten <li>
    li.innerHTML = `
        <span class="todo-text">${text}</span>
        <span class="todo-date">(${date})</span>
        <div class="actions">
            <button class="complete-btn">Selesai</button>
            <button class="delete-btn">Hapus</button>
        </div>
    `;
    
    // 3C. Masukkan item baru ke dalam daftar <ul>
    todoList.appendChild(li);
}

// 4. Event Listener untuk Hapus dan Selesai (Toggle Status)
todoList.addEventListener('click', function(e) {
    const target = e.target; // Elemen yang diklik

    // Cek apakah tombol yang diklik adalah tombol "Hapus"
    if (target.classList.contains('delete-btn')) {
        const listItem = target.closest('.todo-item'); // Dapatkan elemen <li> terdekat
        listItem.remove(); // Hapus elemen dari DOM
    }

    // Cek apakah tombol yang diklik adalah tombol "Selesai"
    if (target.classList.contains('complete-btn')) {
        const listItem = target.closest('.todo-item');
        
        // Toggle status 'data-completed'
        const isCompleted = listItem.getAttribute('data-completed') === 'true';
        listItem.setAttribute('data-completed', isCompleted ? 'false' : 'true');

        // Ganti teks tombol
        target.textContent = isCompleted ? 'Selesai' : 'Belum Selesai';

        // (CSS bakalan pake ini untuk efek coretan)
    }
});

// --- Fitur Filter ---

// Event Listener untuk Filter
filterSelect.addEventListener('change', filterTodos);

function filterTodos() {
    const filterValue = filterSelect.value;
    const todos = todoList.childNodes; // Ambil semua item <li>

    todos.forEach(function(todo) {
        // Hanya proses elemen yang merupakan todo-item (bukan teks kosong antar elemen)
        if (todo.nodeType === 1 && todo.classList.contains('todo-item')) {
            const isCompleted = todo.getAttribute('data-completed') === 'true';
            
            switch (filterValue) {
                case 'all':
                    // Tampilkan semua
                    todo.style.display = 'flex'; 
                    break;
                case 'completed':
                    // Tampilkan hanya yang selesai
                    if (isCompleted) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'uncompleted':
                    // Tampilkan hanya yang belum selesai
                    if (!isCompleted) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}
