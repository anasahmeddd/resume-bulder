const toggleSkillsButton1 = document.getElementById("toggle-skills-btn") as HTMLElement;
const skillsSection1 = document.getElementById("skill-list") as HTMLElement;

toggleSkillsButton1.addEventListener("click", () => {
    if (skillsSection1.style.display === "none") {
        skillsSection1.style.display = "block";
    } else {
        skillsSection1.style.display = "none";
    }
});

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const personalInfoSection = document.getElementById("personal-info") as HTMLElement;
const educationSection = document.getElementById("education") as HTMLElement;
const workExperienceSection = document.getElementById("work-experience") as HTMLElement;
const skillListSection = document.getElementById("skill-list") as HTMLElement;

let Name: string = '';
let email: string = '';
let avatar: File | undefined = undefined;
let degree: string = '';
let school: string = '';
let gradYear: any;
let jobTitle: string = '';
let company: string = '';
let jobDates: any;
let skills = [''];

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


    const avatarUrl = avatar ? URL.createObjectURL(avatar) : "";
    personalInfoSection.innerHTML = `<h3>Personal Information</h3>
   <p><strong>Name:</strong> ${Name}</p><p><strong>Email:</strong> ${email}</p>
   <img src=${avatarUrl} alt="Profile Picture" class="profile-pic"> `;
    educationSection.innerHTML = `<h3>Education</h3><p>${degree} from ${school} (${gradYear})</p>`;
    workExperienceSection.innerHTML = `<h3>Work Experience</h3><p>${jobTitle} at ${company} (${jobDates})</p>`;
    skillListSection.innerHTML = `<h3>Skills</h3><ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>`;
});

//saving doc
interface Resume {
    id: string;
    personalInfo: {
        name: string;
        avatar: File | undefined;
        email: string;
    };
    education: {
        gradYear: any;
        degree: string;
        school: string;
    };
    work: {
        jobTitle: string;
        jobDates: any;
        company: string;
    };
    skills: string[];
}

const saveButton = document.getElementById("save-btn") as HTMLElement;
const savedResumesContainer = document.getElementById("saved-resumes") as HTMLElement;

saveButton.addEventListener("click", () => {
    const savedResume: Resume = {
        id: crypto.randomUUID(),
        personalInfo: {
            name: Name,
            avatar,
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

    let resumesArray: Resume[] = [];

    if (previousResume) {
        resumesArray = JSON.parse(previousResume);
    }

    resumesArray.push(savedResume);

    localStorage.setItem('savedResume', JSON.stringify(resumesArray));
    personalInfoSection.innerHTML = '';
    educationSection.innerHTML = '';
    workExperienceSection.innerHTML = '';
    skillListSection.innerHTML = '';

    (document.getElementById("resume-form") as HTMLFormElement).reset();

    displaySavedResumes();
});

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
            </div>
                <p>Email: ${resume.personalInfo.email}</p>
                <p>Degree: ${resume.education.degree}</p>
                <p>Job Title: ${resume.work.jobTitle}</p>
                <p>Skills: ${resume.skills.join(', ')}</p>
            `;
            savedResumesContainer.appendChild(resumeCard);
        });
    }
}

document.addEventListener("DOMContentLoaded", displaySavedResumes);