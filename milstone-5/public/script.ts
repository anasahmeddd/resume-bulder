const toggleSkillsButton = document.getElementById("toggle-skills-btn") as HTMLElement;
const skillsSection = document.getElementById("skill-list") as HTMLElement;
const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const personalInfoSection = document.getElementById("personal-info") as HTMLElement;
const educationSection = document.getElementById("education") as HTMLElement;
const workExperienceSection = document.getElementById("work-experience") as HTMLElement;
const skillListSection = document.getElementById("skill-list") as HTMLElement;
const saveButton = document.getElementById("save-btn") as HTMLElement;
const downloadButton = document.getElementById("down-btn") as HTMLElement;
const delButton = document.getElementById("del-btn") as HTMLElement;
const savedResumesContainer = document.getElementById("saved-resumes") as HTMLElement;

let Name: string = '';
let email: string = '';
let avatar: File | undefined = undefined;
let avatarUrl = '';
let degree: string = '';
let school: string = '';
let gradYear: any;
let jobTitle: string = '';
let company: string = '';
let jobDates: string = '';
let skills: string[] = [];

// Toggle Skills Section
toggleSkillsButton.addEventListener("click", () => {
    if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
    } else {
        skillsSection.style.display = "none";
    }
});

// Form Submission Logic
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    Name = (document.getElementById("name") as HTMLInputElement).value;
    email = (document.getElementById("email") as HTMLInputElement).value;
    avatar = (document.getElementById("avatar") as HTMLInputElement).files?.[0];
    degree = (document.getElementById("degree") as HTMLInputElement).value;
    school = (document.getElementById("school") as HTMLInputElement).value;
    gradYear = (document.getElementById("grad-year") as HTMLInputElement).value;
    jobTitle = (document.getElementById("job-title") as HTMLInputElement).value;
    company = (document.getElementById("company") as HTMLInputElement).value;
    jobDates = (document.getElementById("job-dates") as HTMLInputElement).value;
    skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

    avatarUrl = avatar ? URL.createObjectURL(avatar) : "";

    personalInfoSection.innerHTML = `<h3>Personal Information</h3>
        <p><strong>Name:</strong> ${Name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <img src="${avatarUrl}" alt="Profile Picture" class="profile-pic">`;

    educationSection.innerHTML = `<h3>Education</h3>
        <p>${degree} from ${school} (${gradYear})</p>`;

    workExperienceSection.innerHTML = `<h3>Work Experience</h3>
        <p>${jobTitle} at ${company} (${jobDates})</p>`;

    skillListSection.innerHTML = `<h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>`;

    const shareableLink = `resume/${Name.replace(/\s+/g, '_')}_cv.html`;

    const linkElement = document.createElement('a');
    linkElement.href = `data:text/html;charset=uft-8,` + encodeURIComponent(`
        <div style="padding: 20px;border: 1px solid #ccc;"> 
        <h3 style="font-size: 2.5rem; margin-bottom: 10px;">Personal Information</h3>
        <p style="font-size: 1.1rem;margin-bottom: 5px;"><strong>Name:</strong> ${Name}</p>
        <p style="font-size: 1.1rem;margin-bottom: 5px;"><strong>Email:</strong> ${email}</p>
        <img style=" width: 180px;height: 180px;border-radius: 50%;object-fit: cover; margin-top: 20px;border: 5px solid #3498db;" src="${avatarUrl}" alt="Profile Picture" class="profile-pic"> 
        <h3 style="font-size: 2.5rem; margin-bottom: 10px;">Education</h3>
        <p style="font-size: 1.2rem;margin-bottom: 10px;">${degree} from ${school} (${gradYear})</p>
        <h3 style="font-size: 2.5rem; margin-bottom: 10px;">Skills</h3>
        <ul style="list-style-type: none; padding: 0;">${skills.map(skill => `<li style=" display: inline-block;background-color: #3498db;color: white;padding: 10px 15px; border-radius: 5px; margin: 5px;font-size: 1rem;transition: background-color 0.3s;">${skill.trim()}</li>`).join('')}</ul>
        <h3 style="font-size: 2.5rem; margin-bottom: 10px;">Work Experience</h3>
        <p style="font-size: 1.1rem;">${jobTitle} at ${company} (${jobDates})</p>
        </div>`
    );

    linkElement.download=shareableLink;
    linkElement.textContent = "Click here to share your resume";
    skillListSection.appendChild(linkElement);
});




saveButton.addEventListener("click", () => {
    const savedResume = {
        id: crypto.randomUUID(),  // Generate a unique ID
        personalInfo: {
            name: Name,
            avatarUrl,
            email,
        },
        education: {
            gradYear,
            degree,
            school,
        },
        work: {
            jobTitle,
            jobDates,
            company,
        },
        skills,
    };

    const previousResume = localStorage.getItem('savedResume');
    let resumesArray: any[] = previousResume ? JSON.parse(previousResume) : [];

    // Add the new resume to the array
    resumesArray.push(savedResume);
    localStorage.setItem('savedResume', JSON.stringify(resumesArray));

    // Create a shareable link with the resume ID as a query parameter


    displaySavedResumes();
});


// Display Saved Resumes
function displaySavedResumes() {
    const previousResume = localStorage.getItem('savedResume');
    savedResumesContainer.innerHTML = ''; // Clear previous content

    if (previousResume) {
        const resumesArray = JSON.parse(previousResume);

        resumesArray.forEach((resume: any) => {
            const resumeCard = document.createElement('div');
            resumeCard.classList.add('resume-card');
            resumeCard.innerHTML = `
                <div>
                <h3>${resume.personalInfo.name}</h3>
                <a href='/edit.html?id=${resume.id}'>edit</a>
                <a href='/resume-details.html?resumeId=${resume.id}'>view</a>
                </div>
                <p>Email: ${resume.personalInfo.email}</p>
                <p>Degree: ${resume.education.degree}</p>
                <p>Job Title: ${resume.work.jobTitle}</p>
                <p>Skills: ${resume.skills.join(', ')}</p>`;
            savedResumesContainer.appendChild(resumeCard);
        });
    }
}

const printButton = document.getElementById("print-btn") as HTMLElement;
printButton.addEventListener("click", () => {
    window.print();
});


// Delete All Resumes
delButton.addEventListener("click", () => {
    localStorage.removeItem('savedResume');
    displaySavedResumes();
});

document.addEventListener("DOMContentLoaded", displaySavedResumes);
