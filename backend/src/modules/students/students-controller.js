const asyncHandler = require("express-async-handler");
const {
    getAllStudents,
    addNewStudent,
    getStudentDetail,
    setStudentStatus,
    updateStudent
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json({ message });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const payload = { ...req.body, id: studentId };
    const message = await updateStudent(payload);
    res.json({ message });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: studentId } = req.params;
    const { id: reviewerId } = req.user; 
    const { status } = req.body;
    const message = await setStudentStatus({ userId: studentId, reviewerId, status });
    res.json({ message });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
