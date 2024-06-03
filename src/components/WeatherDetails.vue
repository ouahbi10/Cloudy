<template>
  <Transition
    ><div v-if="weatherResults.isLoaded" class="weather-details">
      <h6>Weather details :</h6>
      <div class="weather-details-content">
        <h3 class="text-capitalize">{{ weatherResults.description }}</h3>
        <div class="details">
          <h3>Temp max</h3>
          <div class="details-values">
            <h3>{{ ComputeTempMax }}°</h3>
            <svg
              class="temp_max"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              height="1.7rem"
            >
              <path
                d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V112c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"
              />
            </svg>
          </div>
        </div>
        <div class="details">
          <h3>Temp min</h3>
          <div class="details-values">
            <h3>{{ ComputeTempMin }}°</h3>
            <svg
              class="temp_min"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              height="1.7rem"
            >
              <path
                d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z"
              />
            </svg>
          </div>
        </div>
        <div class="details">
          <h3>Humidity</h3>
          <div class="details-values">
            <h3>{{ main.humidity }}%</h3>
            <svg
              class="white-fill"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              height="1.5rem"
            >
              <path
                d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
              />
            </svg>
          </div>
        </div>
        <div class="details">
          <h3>Cloudy</h3>
          <div class="details-values">
            <h3>{{ main.cloudy }}%</h3>
            <svg
              class="white-fill"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              height="1.5rem"
            >
              <path
                d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"
              />
            </svg>
          </div>
        </div>
        <div class="details">
          <h3>Wind</h3>
          <div class="details-values">
            <h3>{{ ComputeWind }} km/h</h3>
            <svg
              class="white-fill"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="1.5rem"
            >
              <path
                d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="more-details-content" v-if="weatherResults.isLoaded">
        <h6>More details :</h6>
        <div class="more-details-container">
          <div class="sunset">
            <h3>Sunset</h3>
            <div class="more-details-text">
              <h3>{{ getFormattedTime(main.sunset) }}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.5rem"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
              </svg>
            </div>
          </div>
          <div class="sunrise">
            <h3>Sunrise</h3>
            <div class="more-details-text">
              <h3>{{ getFormattedTime(main.sunrise) }}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.5rem"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
              </svg>
            </div>
          </div>
        </div>
      </div></div
  ></Transition>
</template>

<style lang="scss" scoped>
.weather-details {
  display: flex;
  justify-content: center;
  //   align-items: center;
  flex-direction: column;
  padding: 10px 50px;
}
.weather-details h6 {
  color: rgba(255, 255, 255, 0.7);
}
.weather-details h3 {
  color: #fff;
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: bold;
}
.weather-details .weather-details-content,
.weather-details .more-details-content {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}
.weather-details .weather-details-content .details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weather-details .weather-details-content .details .details-values {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}
.weather-details .weather-details-content .details h3 {
  font-size: 1rem !important;
  margin: 0;
  font-weight: 300;
  color: rgb(255, 255, 255, 0.9);
}
.weather-details .weather-details-content .details .details-values svg {
  margin: 0;
  padding: 0;
}
.weather-details .weather-details-content .details .details-values h3 {
  margin-right: 10px;
}
.weather-details .weather-details-content .details .details-values .white-fill {
  fill: #fff;
}
.weather-details .weather-details-content .details .details-values .temp_max {
  fill: #c53c3c;
}
.weather-details .weather-details-content .details .details-values .temp_min {
  fill: #6d97ca;
}
.more-details-content .more-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.more-details-content .more-details-container .sunset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}
.more-details-content .more-details-container .sunset h3 {
  font-size: 1rem !important;
  margin: 0;
  font-weight: 300;
  color: rgb(255, 255, 255, 0.9);
}
.more-details-content .more-details-container .sunset .more-details-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more-details-content .more-details-container .sunset .more-details-text h3 {
  margin-right: 10px;
}
.more-details-content .more-details-container .sunset .more-details-text svg {
  margin: 0;
  padding: 0;
  fill: #fc753d;
}
.more-details-content .more-details-container .sunrise {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}
.more-details-content .more-details-container .sunrise h3 {
  font-size: 1rem !important;
  margin: 0;
  font-weight: 300;
  color: rgb(255, 255, 255, 0.9);
}
.more-details-content .more-details-container .sunrise .more-details-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more-details-content .more-details-container .sunrise .more-details-text h3 {
  margin-right: 10px;
}
.more-details-content .more-details-container .sunrise .more-details-text svg {
  margin: 0;
  padding: 0;
  fill: #fbefac;
}

@media screen and (max-width: 780px) {
  .weather-details {
    text-align: center;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.8s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {
      coord: {
        lon: "",
        lat: "",
      },
      weatherResults: {
        description: "",
        isLoaded: false,
      },
      main: {
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
        cloudy: 0,
        wind: 0,
        sunset: 0,
        sunrise: 0,
      },
    };
  },
  methods: {
    async getWeather() {
      if (this.coord.lat.length === 0 || this.coord.lon.length === 0) return;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.coord.lat}&lon=${this.coord.lon}&appid=53eb0069d174e99a966a9bb6772f4f7e`
        );
        const data = await response.json();
        this.weatherResults.description = await data.weather[0].description;
        this.main.temp_min = await data.main.temp_min;
        this.main.temp_max = await data.main.temp_max;
        this.main.humidity = await data.main.humidity;
        this.main.cloudy = await data.clouds.all;
        this.main.wind = await data.wind.speed;
        this.main.sunset = await data.sys.sunset;
        this.main.sunrise = await data.sys.sunrise;
        this.weatherResults.isLoaded = true;
      } catch (error) {
        console.error(error);
      }
    },
    getFormattedTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getUTCHours().toString().padStart(2, "0"); // UTC hour
      const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // UTC minutes
      return `${hours}:${minutes}`;
    },
  },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("city-selected", (city) => {
      this.coord.lat = city.lat;
      this.coord.lon = city.lon;
      this.getWeather();
    });
  },
  computed: {
    ComputeTempMin() {
      return Math.round(this.main.temp_min - 273.15);
    },
    ComputeTempMax() {
      return Math.round(this.main.temp_max - 273.15);
    },
    ComputeWind() {
      return Math.round(this.main.wind);
    },
  },
};
</script>
