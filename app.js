window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let locationTimezone = document.querySelector(".location-timezone");
  let timeSection = document.querySelector(".time-section");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSectionSpan = document.querySelector(
    ".temperature-section span"
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const proxy = "https://vismaya-kalyan.github.io/";
      const api = `${proxy}https://api.darksky.net/forecast/7c1df849557baae56200142867b023a6/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon, time } = data.currently;
          console.log(data);
          // set DOM Elements from the API
          locationTimezone.textContent = data.timezone;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;

          // set icon
          setIcons(icon, document.querySelector(".icon"));

          // set to c/f
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          temperatureSection.addEventListener("click", () => {
            if (temperatureSectionSpan.textContent == "F") {
              temperatureSectionSpan.textContent = "C";
              temperatureDegree.textContent = celsius;
            } else {
              temperatureSectionSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });

          formatted_time = timeConverter(time);
          timeSection.textContent = formatted_time;
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + "   " + hour + ":" + min + ":" + sec;
    return time;
  }
  console.log(timeConverter(0));
});

// const life = 100; // life variable

// life = life - 10;

// var checkout = false;

// console.log(life);

// const name = "vismaya"; /*comment*/

// function upperCase(name) {
//   console.log(name.toUpperCase());
// }
// upperCase(name);
