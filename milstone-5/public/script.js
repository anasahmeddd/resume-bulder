var toggleSkillsButton = document.getElementById("toggle-skills-btn");
var skillsSection = document.getElementById("skill-list");
var resumeForm = document.getElementById("resume-form");
var personalInfoSection = document.getElementById("personal-info");
var educationSection = document.getElementById("education");
var workExperienceSection = document.getElementById("work-experience");
var skillListSection = document.getElementById("skill-list");
var saveButton = document.getElementById("save-btn");
var downloadButton = document.getElementById("down-btn");
var delButton = document.getElementById("del-btn");
var savedResumesContainer = document.getElementById("saved-resumes");
var Name = '';
var email = '';
var avatar = undefined;
var avatarUrl = '';
var degree = '';
var school = '';
var gradYear;
var jobTitle = '';
var company = '';
var jobDates = '';
var skills = [];
// Toggle Skills Section
toggleSkillsButton.addEventListener("click", function () {
    if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
    }
    else {
        skillsSection.style.display = "none";
    }
});
// Form Submission Logic
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
    personalInfoSection.innerHTML = "<h3>Personal Information</h3>\n        <p><strong>Name:</strong> ".concat(Name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <img src=\"").concat(avatarUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\">");
    educationSection.innerHTML = "<h3>Education</h3>\n        <p>".concat(degree, " from ").concat(school, " (").concat(gradYear, ")</p>");
    workExperienceSection.innerHTML = "<h3>Work Experience</h3>\n        <p>".concat(jobTitle, " at ").concat(company, " (").concat(jobDates, ")</p>");
    skillListSection.innerHTML = "<h3>Skills</h3>\n        <ul>".concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>");
    var shareableLink = "resume/".concat(Name.replace(/\s+/g, '_'), "_cv.html");
    var linkElement = document.createElement('a');
    linkElement.href = "data:text/html;charset=uft-8," + encodeURIComponent("\n        <div style=\"padding: 20px;border: 1px solid #ccc;\"> \n        <h3 style=\"font-size: 2.5rem; margin-bottom: 10px;\">Personal Information</h3>\n        <p style=\"font-size: 1.1rem;margin-bottom: 5px;\"><strong>Name:</strong> ".concat(Name, "</p>\n        <p style=\"font-size: 1.1rem;margin-bottom: 5px;\"><strong>Email:</strong> ").concat(email, "</p>\n        <img style=\" width: 180px;height: 180px;border-radius: 50%;object-fit: cover; margin-top: 20px;border: 5px solid #3498db;\" src=\"").concat(avatarUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\"> \n        <h3 style=\"font-size: 2.5rem; margin-bottom: 10px;\">Education</h3>\n        <p style=\"font-size: 1.2rem;margin-bottom: 10px;\">").concat(degree, " from ").concat(school, " (").concat(gradYear, ")</p>\n        <h3 style=\"font-size: 2.5rem; margin-bottom: 10px;\">Skills</h3>\n        <ul style=\"list-style-type: none; padding: 0;\">").concat(skills.map(function (skill) { return "<li style=\" display: inline-block;background-color: #3498db;color: white;padding: 10px 15px; border-radius: 5px; margin: 5px;font-size: 1rem;transition: background-color 0.3s;\">".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n        <h3 style=\"font-size: 2.5rem; margin-bottom: 10px;\">Work Experience</h3>\n        <p style=\"font-size: 1.1rem;\">").concat(jobTitle, " at ").concat(company, " (").concat(jobDates, ")</p>\n        </div>"));
    linkElement.download = shareableLink;
    linkElement.textContent = "Click here to share your resume";
    skillListSection.appendChild(linkElement);
});
saveButton.addEventListener("click", function () {
    var savedResume = {
        id: crypto.randomUUID(), // Generate a unique ID
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
    var resumesArray = previousResume ? JSON.parse(previousResume) : [];
    // Add the new resume to the array
    resumesArray.push(savedResume);
    localStorage.setItem('savedResume', JSON.stringify(resumesArray));
    // Create a shareable link with the resume ID as a query parameter
    displaySavedResumes();
});
// Display Saved Resumes
function displaySavedResumes() {
    var previousResume = localStorage.getItem('savedResume');
    savedResumesContainer.innerHTML = ''; // Clear previous content
    if (previousResume) {
        var resumesArray = JSON.parse(previousResume);
        resumesArray.forEach(function (resume) {
            var resumeCard = document.createElement('div');
            resumeCard.classList.add('resume-card');
            resumeCard.innerHTML = "\n                <div>\n                <h3>".concat(resume.personalInfo.name, "</h3>\n                <a href='/edit.html?id=").concat(resume.id, "'>edit</a>\n                <a href='/resume-details.html?resumeId=").concat(resume.id, "'>view</a>\n                </div>\n                <p>Email: ").concat(resume.personalInfo.email, "</p>\n                <p>Degree: ").concat(resume.education.degree, "</p>\n                <p>Job Title: ").concat(resume.work.jobTitle, "</p>\n                <p>Skills: ").concat(resume.skills.join(', '), "</p>");
            savedResumesContainer.appendChild(resumeCard);
        });
    }
}
var printButton = document.getElementById("print-btn");
printButton.addEventListener("click", function () {
    window.print();
});
// Delete All Resumes
delButton.addEventListener("click", function () {
    localStorage.removeItem('savedResume');
    displaySavedResumes();
});
document.addEventListener("DOMContentLoaded", displaySavedResumes);
