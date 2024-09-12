
function getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const resumeId = getQueryParam('id');

function populateEditForm(resume: any) {
    (document.getElementById("name") as HTMLInputElement).value = resume.personalInfo.name;
    (document.getElementById("email") as HTMLInputElement).value = resume.personalInfo.email;
    (document.getElementById("profile") as HTMLInputElement).innerHTML = `<img src=${resume.personalInfo.avatarUrl} alt="Profile Picture" class="profile-pic">`;
    (document.getElementById("degree") as HTMLInputElement).value = resume.education.degree;
    (document.getElementById("school") as HTMLInputElement).value = resume.education.school;
    (document.getElementById("grad-year") as HTMLInputElement).value = resume.education.gradYear;
    (document.getElementById("job-title") as HTMLInputElement).value = resume.work.jobTitle;
    (document.getElementById("company") as HTMLInputElement).value = resume.work.company;
    (document.getElementById("job-dates") as HTMLInputElement).value = resume.work.jobDates;
    (document.getElementById("skills") as HTMLInputElement).value = resume.skills.join(", ");
}


function loadResumeForEdit() {
    const savedResumes = localStorage.getItem('savedResume');
    if (savedResumes && resumeId) {
        const resumesArray = JSON.parse(savedResumes);
        const resumeToEdit = resumesArray.find((resume: any) => resume.id === resumeId);

        if (resumeToEdit) {
            populateEditForm(resumeToEdit);
        } else {
            alert("Resume not found!");
        }
    } else {
        alert("No resumes saved!");
    }
}


const editButton = document.getElementById("edit-btn") as HTMLElement;
editButton.addEventListener("click", () => {
    const savedResumes = localStorage.getItem('savedResume');
    if (savedResumes && resumeId) {
        let resumesArray = JSON.parse(savedResumes);
        const avatar = (document.getElementById("avatar") as HTMLInputElement).files?.[0]


        const updatedResume = {
            id: resumeId,
            personalInfo: {
                name: (document.getElementById("name") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value,
                avatarUrl: avatar ? URL.createObjectURL(avatar) : ""

            },
            education: {
                degree: (document.getElementById("degree") as HTMLInputElement).value,
                school: (document.getElementById("school") as HTMLInputElement).value,
                gradYear: (document.getElementById("grad-year") as HTMLInputElement).value,
            },
            work: {
                jobTitle: (document.getElementById("job-title") as HTMLInputElement).value,
                company: (document.getElementById("company") as HTMLInputElement).value,
                jobDates: (document.getElementById("job-dates") as HTMLInputElement).value,
            },
            skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim()),
        };


        resumesArray = resumesArray.map((resume: any) => resume.id === resumeId ? updatedResume : resume);


        localStorage.setItem('savedResume', JSON.stringify(resumesArray));
        alert("Resume updated successfully!");
        window.location.href = '/milestone-4/index.html'
    }
});

document.addEventListener("DOMContentLoaded", loadResumeForEdit);
