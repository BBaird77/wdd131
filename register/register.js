document.addEventListener("DOMContentLoaded", function () {
    let participantCount = 1;
    const addButton = document.getElementById("add");
    const participantsFieldset = document.querySelector(".participants");
    const form = document.querySelector("form");
    const summary = document.getElementById("summary");

    function participantTemplate(count) {
        return `
        <section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
              <label for="fname_${count}"> First Name<span>*</span></label>
              <input id="fname_${count}" type="text" name="fname_${count}" required />
            </div>
            <div class="item activities">
              <label for="activity_${count}">Activity #<span>*</span></label>
              <input id="activity_${count}" type="text" name="activity_${count}" />
            </div>
            <div class="item">
              <label for="fee_${count}">Fee ($)<span>*</span></label>
              <input id="fee_${count}" type="number" name="fee_${count}" />
            </div>
            <div class="item">
              <label for="date_${count}">Desired Date <span>*</span></label>
              <input id="date_${count}" type="date" name="date_${count}" />
            </div>
            <div class="item">
              <p>Grade</p>
              <select id="grade_${count}" name="grade_${count}">
                <option value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
        </section>`;
    }

    function calculateTotalFees() {
        let totalFees = 0;
        document.querySelectorAll("[id^=fee_]").forEach(feeInput => {
            totalFees += Number(feeInput.value) || 0;
        });
        return totalFees;
    }

    function successTemplate(info) {
        return `<p>Thank you for registering, ${info.adultName}. You have registered ${info.participantCount} participants and owe a total of $${info.totalFees} in Fees.</p>`;
    }

    addButton.addEventListener("click", function () {
        participantCount++;
        const newParticipantHTML = participantTemplate(participantCount);
        addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const totalFees = calculateTotalFees();
        const adultName = document.getElementById("adult_name").value;
        
        form.style.display = "none";
        summary.style.display = "block";
        summary.innerHTML = successTemplate({ adultName, participantCount, totalFees });
    });
});
