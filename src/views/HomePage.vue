<template>
  <div class="landing">
    <div class="landing-content">
      <img class="logo" src="../assets/logo.png" alt="Logo" />
      <Transition>
        <div class="landing-weather" v-show="coord.isLoaded">
          <h1 class="temperature">{{ ComputeTemp }}°</h1>
          <div class="landing-weather-content">
            <h2 class="city">{{ coord.cityName }}</h2>
            <h6>{{ DateReturn }}</h6>
          </div>
          <img :src="weatherIconUrl" alt="icon" class="weather-icon" />
        </div>
      </Transition>
    </div>

    <div class="content">
      <Transition>
        <div class="main-content">
          <city-search />
          <weather-details v-show="coord.isLoaded" />
          <WeatherForcast v-show="coord.isLoaded" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
.landing {
  height: 100vh;
  background-image: url(../assets/landing.jpg);
  background-size: cover;
  display: flex;
}
.landing .landing-content {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.landing .logo {
  width: 100px;
  z-index: 3;
  margin: 20px 40px;
}
.landing .content {
  width: 40%;
  height: 100%;
  backdrop-filter: blur(10px);
  border-left: 4px rgba(119, 118, 118, 0.2) solid;
  border-radius: 7px;
  flex: 1;
  overflow-y: auto;
}
.landing .main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.landing .landing-weather {
  margin: 50px 40px;
  display: flex;
  align-items: center;
}
.landing .landing-weather h1 {
  color: #fff;
  font-size: 6rem;
}
.landing .landing-weather .landing-weather-content {
  padding: 0 10px;
  color: #fff;
}
.landing .landing-weather .landing-weather-content h2 {
  font-size: 2.6rem;
}
.landing .landing-weather .weather-icon {
  height: 100px;
}

@media screen and (max-width: 780px) {
  .landing {
    flex-direction: column;
    align-items: center;
  }
  .landing .landing-content {
    width: 100%;
  }
  .landing .content {
    width: 100%;
    height: auto;
    border-top: 4px rgba(119, 118, 118, 0.2) solid;
    border-left: none;
    overflow-y: scroll;
  }
  .landing .logo {
    width: 80px;
    margin: 10px 40px;
  }
}
@media screen and (max-width: 576px) {
  .landing .landing-weather h1 {
    font-size: 3rem;
  }
  .landing .landing-weather .landing-weather-content h2 {
    font-size: 1rem;
  }
  .landing .landing-weather .landing-weather-content h6 {
    font-size: 0.6rem;
  }
  .landing .landing-weather .weather-icon {
    height: 60px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>
import CitySearch from "@/components/CitySearch.vue";
import WeatherDetails from "@/components/WeatherDetails.vue";
import WeatherForcast from "@/components/WeatherForcast.vue";
export default {
  data() {
    return {
      coord: {
        lat: "",
        lon: "",
        cityName: "",
        isLoaded: false,
      },
      weatherResults: {},
      weatherIconCode: "",
      time: "",
      temp: 0,
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
        this.weatherResults = await data;
        this.weatherIconCode = await data.weather[0].icon;
        this.time = await data.timezone;
        this.temp = await data.main.temp;
        this.coord.isLoaded = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { CitySearch, WeatherDetails, WeatherForcast },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("city-selected", (city) => {
      this.coord.lat = city.lat;
      this.coord.lon = city.lon;
      this.coord.cityName = city.cityName;
      this.getWeather();
      this.DateReturn;
    });
  },
  computed: {
    weatherIconUrl() {
      return `https://openweathermap.org/img/wn/${this.weatherIconCode}@2x.png`;
    },
    DateReturn() {
      if (!this.time) return "";
      const utcDate = new Date();
      // Adjust by timezone offset
      const localTime = new Date(utcDate.getTime() + (this.time - 3600) * 1000);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return localTime.toLocaleDateString("en-US", options);
    },
    ComputeTemp() {
      return Math.round(this.temp - 273.15);
    },
  },
};
</script>
