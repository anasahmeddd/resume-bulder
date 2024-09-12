function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
var resumeId = getQueryParam('id');
function populateEditForm(resume) {
    document.getElementById("name").value = resume.personalInfo.name;
    document.getElementById("email").value = resume.personalInfo.email;
    document.getElementById("profile").innerHTML = "<img src=".concat(resume.personalInfo.avatarUrl, " alt=\"Profile Picture\" class=\"profile-pic\">");
    document.getElementById("degree").value = resume.education.degree;
    document.getElementById("school").value = resume.education.school;
    document.getElementById("grad-year").value = resume.education.gradYear;
    document.getElementById("job-title").value = resume.work.jobTitle;
    document.getElementById("company").value = resume.work.company;
    document.getElementById("job-dates").value = resume.work.jobDates;
    document.getElementById("skills").value = resume.skills.join(", ");
}
function loadResumeForEdit() {
    var savedResumes = localStorage.getItem('savedResume');
    if (savedResumes && resumeId) {
        var resumesArray = JSON.parse(savedResumes);
        var resumeToEdit = resumesArray.find(function (resume) { return resume.id === resumeId; });
        if (resumeToEdit) {
            populateEditForm(resumeToEdit);
        }
        else {
            alert("Resume not found!");
        }
    }
    else {
        alert("No resumes saved!");
    }
}
var editButton = document.getElementById("edit-btn");
editButton.addEventListener("click", function () {
    var _a;
    var savedResumes = localStorage.getItem('savedResume');
    if (savedResumes && resumeId) {
        var resumesArray = JSON.parse(savedResumes);
        var avatar = (_a = document.getElementById("avatar").files) === null || _a === void 0 ? void 0 : _a[0];
        var updatedResume_1 = {
            id: resumeId,
            personalInfo: {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                avatarUrl: avatar ? URL.createObjectURL(avatar) : ""
            },
            education: {
                degree: document.getElementById("degree").value,
                school: document.getElementById("school").value,
                gradYear: document.getElementById("grad-year").value,
            },
            work: {
                jobTitle: document.getElementById("job-title").value,
                company: document.getElementById("company").value,
                jobDates: document.getElementById("job-dates").value,
            },
            skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); }),
        };
        resumesArray = resumesArray.map(function (resume) { return resume.id === resumeId ? updatedResume_1 : resume; });
        localStorage.setItem('savedResume', JSON.stringify(resumesArray));
        alert("Resume updated successfully!");
        window.location.href = '/milestone-4/index.html';
    }
});
document.addEventListener("DOMContentLoaded", loadResumeForEdit);
