var toggleSkillsButton1 = document.getElementById("toggle-skills-btn");
var skillsSection1 = document.getElementById("skill-list");
toggleSkillsButton1.addEventListener("click", function () {
    if (skillsSection1.style.display === "none") {
        skillsSection1.style.display = "block";
    }
    else {
        skillsSection1.style.display = "none";
    }
});
var resumeForm = document.getElementById("resume-form");
var personalInfoSection = document.getElementById("personal-info");
var educationSection = document.getElementById("education");
var workExperienceSection = document.getElementById("work-experience");
var skillListSection = document.getElementById("skill-list");
var Name = '';
var email = '';
var avatar = undefined;
var degree = '';
var school = '';
var gradYear;
var jobTitle = '';
var company = '';
var jobDates;
var skills = [''];
var avatarUrl = '';
resumeForm.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    Name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    avatar = (_a = document.getElementById("avatar").files) === null || _a === void 0 ? void 0 : _a[0];
    degree = document.getElementById("degree").value;
    school = document.getElementById("school").value;
    gradYear = document.getElementById("grad-year").value;
    jobTitle = document.getElementById("job-title").value;
    company = document.getElementById("company").value;
    jobDates = document.getElementById("job-dates").value;
    skills = document.getElementById("skills").value.split(",");
    avatarUrl = avatar ? URL.createObjectURL(avatar) : "";
    personalInfoSection.innerHTML = "<h3>Personal Information</h3>\n   <p><strong>Name:</strong> ".concat(Name, "</p><p><strong>Email:</strong> ").concat(email, "</p>\n   <img src=").concat(avatarUrl, " alt=\"Profile Picture\" class=\"profile-pic\"> ");
    educationSection.innerHTML = "<h3>Education</h3><p>".concat(degree, " from ").concat(school, " (").concat(gradYear, ")</p>");
    workExperienceSection.innerHTML = "<h3>Work Experience</h3><p>".concat(jobTitle, " at ").concat(company, " (").concat(jobDates, ")</p>");
    skillListSection.innerHTML = "<h3>Skills</h3><ul>".concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(""), "</ul>");
});
var saveButton = document.getElementById("save-btn");
var savedResumesContainer = document.getElementById("saved-resumes");
saveButton.addEventListener("click", function () {
    var savedResume = {
        id: crypto.randomUUID(),
        personalInfo: {
            name: Name,
            avatarUrl: avatarUrl,
            email: email,
        },
        education: {
            gradYear: gradYear,
            degree: degree,
            school: school,
        },
        work: {
            jobTitle: jobTitle,
            jobDates: jobDates,
            company: company,
        },
        skills: skills,
    };
    var previousResume = localStorage.getItem('savedResume');
    var resumesArray = [];
    if (previousResume) {
        resumesArray = JSON.parse(previousResume);
    }
    resumesArray.push(savedResume);
    localStorage.setItem('savedResume', JSON.stringify(resumesArray));
    personalInfoSection.innerHTML = '';
    educationSection.innerHTML = '';
    workExperienceSection.innerHTML = '';
    skillListSection.innerHTML = '';
    document.getElementById("resume-form").reset();
    displaySavedResumes();
});
function displaySavedResumes() {
    var previousResume = localStorage.getItem('savedResume');
    savedResumesContainer.innerHTML = ''; // Clear previous content
    if (previousResume) {
        var resumesArray = JSON.parse(previousResume);
        resumesArray.forEach(function (resume) {
            var resumeCard = document.createElement('div');
            resumeCard.classList.add('resume-card');
            resumeCard.innerHTML = "\n            <div>\n            <h3>".concat(resume.personalInfo.name, "</h3>\n            <a href='/milestone-4/edit.html?id=").concat(resume.id, "'>edit</a>\n            </div>\n                <p>Email: ").concat(resume.personalInfo.email, "</p>\n                <p>Degree: ").concat(resume.education.degree, "</p>\n                <p>Job Title: ").concat(resume.work.jobTitle, "</p>\n                <p>Skills: ").concat(resume.skills.join(', '), "</p>\n            ");
            savedResumesContainer.appendChild(resumeCard);
        });
    }
}
document.addEventListener("DOMContentLoaded", displaySavedResumes);
