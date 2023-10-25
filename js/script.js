const myInfo = JSON.parse(tasks);
// console.log(myInfo);

function createCard(cardLoop) {
  return `<div class="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-12 my-4 d-flex justify-content-center">
      <div class="card border border-2 shadow" style="width: 18rem">
        <div class="card-body">
          <div class="cardheader d-flex justify-content-between border border-0 m-1">
            <button class="btn btn-primary" type="button">Task</button>
            <div class="d-flex">
              <button class="btn btn-outline-light border border-0 p-1" type="button">
                <img src="./images/icons8-lesezeichen-25.png" alt="" />
              </button>
              <button class="btn btn-outline-light border border-0 p-1" type="button">
                <img src="./images/icons8-menü-2-25.png" alt="" />
              </button>
            </div>
          </div>
          <img src="${cardLoop.image}" class="card-img-top" alt="..." />
          <h5 class="card-title pt-2">${cardLoop.taskDesc}</h5>
          <p class="card-text">${cardLoop.bPoint}</p>
        </div>
        <hr class="d-flex mx-2" />
        <ul class="list-group list-group-flush border border-0">
          <li class="list-group-item border border-0 d-flex justify-content-start align-middle">
            <img class="me-2" src="./images/icons8-priority-25.png" alt="" />Priority level:
            <button class="btn btn-success border border-0 px-2 py-0 ms-2 prioBtn"><span class="prio text-black">${cardLoop.importance}</span></button>
          </li>
          <li class="list-group-item border border-0 d-flex justify-content-start">
            <img class="me-2" src="./images/icons8-deadline-25.png" alt="" />Deadline: ${cardLoop.dLine}
          </li>
          <hr class="d-flex mx-2" />
        </ul>
        <div class="d-flex justify-content-end pb-3 px-3">
          <button class="btn btn-danger p-1 me-2">
            <img class="me-1" src="./images/icons8-müll-24.png" alt="" />Delete
          </button>
          <button class="btn btn-success p-1">
            <img class="me-1" src="./images/icons8-häkchen-24.png" alt="" />Done
          </button>
        </div>
      </div>
    </div>`;
}

function updatePrioBtn(button, importance) {
  if (importance < 2) {
    button.style.backgroundColor = "#198754";
  } else if (importance < 4) {
    button.style.backgroundColor = "#ffc107";
  } else {
    button.style.backgroundColor = "#dc3545";
  }
}

function addCards(info) {
  const cardContainer = document.getElementById("cardcontainer");
  cardContainer.innerHTML = "";

  info.forEach((cardLoop) => {
    const card = createCard(cardLoop);
    cardContainer.innerHTML += card;
  });

  const prioBtns = document.querySelectorAll(".prioBtn");
  prioBtns.forEach((button, i) => {
    const importance = myInfo[i].importance;
    updatePrioBtn(button, importance);

    button.addEventListener("click", function () {
      incPrio(i);
    });

    function incPrio(iBtn) {
      if (myInfo[iBtn].importance < 5) {
        myInfo[iBtn].importance++;
        document.querySelectorAll(".prio")[iBtn].innerText =
          myInfo[iBtn].importance;

        updatePrioBtn(button, myInfo[iBtn].importance);
      } else {
        myInfo[iBtn].importance = 0;
        document.querySelectorAll(".prio")[iBtn].innerText =
          myInfo[iBtn].importance;

        updatePrioBtn(button, myInfo[iBtn].importance);
      }
    }
  });
}

document.getElementById("sortBtn").addEventListener("click", function () {
  let sortedPrio = myInfo.sort((a, b) => b.importance - a.importance);
  addCards(sortedPrio);
});

addCards(myInfo);
