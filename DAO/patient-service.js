class PatientService {
    constructor(dao) {      //Đểkhởi tạo một đối tượng từ class ProjectRepository chúng ta cần truyền một đối tượng AppDAO cho nó
        this.dao = dao;
        this.createTable();
    }

    createTable() {   //Hàm tạo bảng này sẽ dùng để tạo ra cấu trúc bảng projects nếu trong file csdl sqlite3 chưa có bảng này.
        const sql = `
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`;
        return this.dao.runquery(sql);
    }

    create(name) {
        console.log("DB new patient name: " + name);
        return this.dao.runquery(
            'INSERT INTO patients (name) VALUES (?)',
            [name]);
    }

    update(id, name) {
        return this.dao.runquery(
            `UPDATE patients SET name = ? WHERE id = ?`,
            [name, id]
        );
    }

    delete(id) {
        return this.dao.runquery(
            `DELETE FROM patients WHERE id = ?`,
            [id]
        );
    }

    deleteAll() {
        return this.dao.runquery(
            `DELETE FROM patients`
        );
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM patients WHERE id = ?`,
            [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM patients`);
    }
}

module.exports = PatientService;