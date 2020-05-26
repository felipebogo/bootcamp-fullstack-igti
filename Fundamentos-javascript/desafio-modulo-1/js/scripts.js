'use strict';

window.addEventListener('load', () => {
  let users = [];
  let filteredUsers = [];
  const estatisticas = {};
  let searchExecuted = false;
  // dom elements
  const userList = document.querySelector("#user-list");
  const inputSearch = document.querySelector('#search-input');
  const buttonSearch = document.querySelector('#search-btn');
  const spanNoFilter = document.querySelector('#no-filter');
  const spanNothingFound = document.querySelector('#nothing-found');
  const spanTotalFound = document.querySelector('#total-found');
  const frames = document.querySelector('#frames');
  const spanMale = document.querySelector('#span-male');
  const spanFemale = document.querySelector('#span-female');
  const spanCountAges = document.querySelector('#span-count-ages');
  const spanAverageAges = document.querySelector('#span-average-ages');



  const loadUsers = async () => {
    const responseBin = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const response = await responseBin.json();
    users = response.results.map(user => {
      const { name, picture, dob, gender } = user;
      return { fullName: name.first + ' ' + name.last, pictureUrl: picture.large, gender, age: dob.age }
    });
  }

  const onSearch = () => {
    console.log("disparou");
    if (inputSearch.value.length > 0) {
      searchExecuted = true
      filteredUsers = users.filter((user) => user.fullName.toLowerCase().includes(inputSearch.value.toLowerCase()));
      filteredUsers.sort((a,b)=>a.fullName.localeCompare(b.fullName));
      render();
    }
  }

  const controlButtonSearch = () =>{
    if (inputSearch.value.length > 0) {
      buttonSearch.removeAttribute('disabled');
      buttonSearch.classList.remove('btn-search-disabled');
      
    }else{
      buttonSearch.setAttribute('disabled', '');
      buttonSearch.classList.add('btn-search-disabled');
    }
  }

  const onInputEnterKey = (ev) => {
    controlButtonSearch();

    if (ev.key === 'Enter' || ev.code === 'Enter') {
      onSearch();
    }
  }

  const loadEvents = () => {
    document.querySelector('#search-btn').addEventListener('click', onSearch);
    inputSearch.addEventListener('keyup', onInputEnterKey);
  }

  /* métodos de renderização */
  const renderList = () => {
    userList.innerHTML = null;
    filteredUsers.forEach(user => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      const spanName = document.createElement('span');
      const { fullName, pictureUrl, age, gender } = user;
      spanName.append(`${fullName}, ${age} anos.`);
      img.src = pictureUrl;
      img.alt = name;

      li.append(img);
      li.append(spanName);
      userList.appendChild(li);
    });
    spanTotalFound.textContent = filteredUsers.length;
  }

  const renderStatistics = () => {
    const formatNumber = Intl.NumberFormat('pt-BR',{maximumFractionDigits:2});
    const { maleCount, femaleCount, ageCount } = filteredUsers.reduce((accumulator, user) => {
      const {gender, age} = user;      
      accumulator.maleCount += gender==='male' ? 1 : 0;
      accumulator.femaleCount += gender==='female' ? 1 : 0;
      accumulator.ageCount += age;
      return accumulator;
    }, { maleCount: 0, femaleCount: 0, ageCount: 0 });
    const averageAges = ageCount / filteredUsers.length;
    spanMale.textContent = formatNumber.format(maleCount);
    spanFemale.textContent = formatNumber.format(femaleCount);
    spanCountAges.textContent = formatNumber.format(ageCount);
    spanAverageAges.textContent = formatNumber.format(averageAges);
  }

  const renderFrames = () => {
    console.log(searchExecuted, filteredUsers.length);
    if (searchExecuted && filteredUsers.length > 0) {
      frames.classList.remove('invisible');
      spanNoFilter.classList.add('invisible');
      spanNothingFound.classList.add('invisible');
    } else if (searchExecuted && filteredUsers.length === 0) {
      frames.classList.add('invisible');
      spanNoFilter.classList.add('invisible');
      spanNothingFound.classList.remove('invisible');
    } else {
      frames.classList.add('invisible');
      spanNoFilter.classList.remove('invisible');
      spanNothingFound.classList.add('invisible');
    }
  }

  const render = () => {
    renderList();
    renderStatistics();
    renderFrames();
  };

  controlButtonSearch();
  loadEvents();
  loadUsers();
  render();

});

