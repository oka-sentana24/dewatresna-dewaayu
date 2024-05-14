<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  import { writable } from "svelte/store";
  import Saos from "saos";

  const rsvpData = writable<
    { nama: string; status: string; pesan: string; created_at: Date }[]
  >([]);

  const currentPage = writable(1);
  const pageSize = 5;
  const totalPages = writable(1);
  const isLoading = writable(true);

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  let isOpenContent = false;
  let queryParams: string = "";
  const toggleContent = () => {
    console.log("toggleContent");
    isOpenContent = !isOpenContent;
  };
  let weddingDate = new Date("2024-05-17").getTime(); // Tanggal pernikahan
  let now = new Date().getTime(); // Waktu saat ini
  let timeLeft = weddingDate - now; // Selisih waktu antara sekarang dan tanggal pernikahan

  let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const updateCountdown = () => {
    now = new Date().getTime();
    timeLeft = weddingDate - now;
    daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hoursLeft = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
  };

  const interval = setInterval(updateCountdown, 1000);
  const refreshContent = () => {
    // Add your logic here to refresh content
    fetchRSVPData(); // For example, you can call fetchRSVPData to refresh RSVP data
  };

  onMount(() => {
    updateCountdown(); // Update countdown saat komponen dimount

    // Ambil query params dari URL
    const urlParams = new URLSearchParams(window.location.search);
    queryParams = urlParams.get("to")!; // Non-null assertion operator

    fetchRSVPData(); // Fetch RSVP data on mount
  });

  onDestroy(() => {
    clearInterval(interval); // Membersihkan interval saat komponen dihancurkan
  });

  const supabaseUrl = "https://ngshwkayjjxfiidmwgyo.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc2h3a2F5amp4ZmlpZG13Z3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYyMjAsImV4cCI6MjAyNzgxMjIyMH0.mFE4aT-yeBQ_K8MR-UyaINhoUKfd-TyLUADEVH0vOmI";
  const supabase = createClient(supabaseUrl, supabaseKey);

  let formData = {
    nama: "",
    status: "",
    pesan: "",
    created_at: new Date(),
  };

  const submitForm = async () => {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const statusInput = document.getElementById("hadir") as HTMLSelectElement;
    const pesanInput = document.getElementById("pesan") as HTMLTextAreaElement;

    formData = {
      nama: nameInput.value,
      status: statusInput.value,
      pesan: pesanInput.value,
      created_at: new Date(), // Add the created_at field with the current date
    };

    const { data, error } = await supabase.from("rsvp").insert([formData]);

    if (error) {
      console.error(error);
    } else {
      console.log("RSVP submitted successfully");
      refreshContent();
      // You can add any success handling here, like showing a success message
    }
  };

  const fetchRSVPData = async () => {
    isLoading.set(true);
    const page = $currentPage;
    const { data, error, count } = await supabase
      .from("rsvp")
      .select("*")
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order("created_at", { ascending: false }); // Sort by descending order of created_at field

    if (error) {
      console.error(error);
    } else {
      const totalCount = count ?? 0;
      const totalPagesValue = Math.ceil(totalCount / pageSize);
      totalPages.set(totalPagesValue);
      rsvpData.set(data);
      isLoading.set(false);
    }
  };

  const changePage = (page: number) => {
    currentPage.set(page);
    fetchRSVPData();
  };

  function formatRelativeDate(dateString: any) {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Convert milliseconds to seconds
    const seconds = Math.floor(diff / 1000);

    // Define time intervals in seconds
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    // Find the appropriate time interval
    for (const [interval, secondsPerInterval] of Object.entries(intervals)) {
      const intervalCount = Math.floor(seconds / secondsPerInterval);
      if (intervalCount >= 1) {
        if (intervalCount === 1) {
          return `Yesterday`;
        } else if (intervalCount === 0) {
          return `Today`;
        } else {
          // For older dates, return the actual date
          const options = { year: "numeric", month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        }
      }
    }

    // If the date is less than a minute ago
    return "Just now";
  }

  let isAudioPlaying = true;
  let audioPlayer: HTMLAudioElement;

  const startAudio = () => {
    audioPlayer.play();
    isAudioPlaying = true;
  };

  const stopAudio = () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Reset audio to start
    isAudioPlaying = false;
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !isOpenContent}
  <section
    class="banner px-5 py-5 h-screen"
    style="background-image: url('/asset/dewa-tresna/CHE08467.jpg') !important; background-position: 40% 10%;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
}"
    transition:fly={{ y: -500, duration: 1000 }}
  >
    <div class="head relative top-0 h-[65vh]">
      <div class="text-center text-white">
        <h4 class="py-5">The Wedding Of</h4>
        <h1 class="text-4xl">Dewa Tresna & Dewa Ayu Tirtawati</h1>
      </div>
    </div>
    <div class="footer relative bottom-0 text-white">
      <div class="text-center">
        <h1>
          <p>{queryParams}</p>
        </h1>
        <p class="py-5">
          Mohon maaf bila ada kesalahan pada penulisan nama/gelar
        </p>
        <button
          class="bg-white text-black rounded-lg px-5 py-4"
          on:click={toggleContent}
        >
          Open Invitation
        </button>
      </div>
    </div>
  </section>
{:else}
  <section>
    <!-- Embedding Audio Player -->
    <div class="audio-container relative hidden">
      <audio
        id="audioPlayer"
        controls
        autoplay
        class="w-full"
        bind:this={audioPlayer}
      >
        <source src="/musik/Sezairi-It-s-You.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </section>
  <section class="content">
    <div
      style="background-image: linear-gradient(180deg, #969696 0%, #353535 100%) !important;"
    >
      <div
        class="head-content"
        style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.54) 100%), url('/asset/dewa-tresna/CHE08512.jpg') !important; background-position: 40% 50%; height: 50vh;
      background-size: cover;
      background-repeat: no-repeat;"
      >
        <div class=" relative h-[50vh] grid justify-center items-end pb-5">
          <div class="text-center text-white">
            <h4>The Wedding Of</h4>
            <h1>Dewa Tresna & Dewa Ayu Tirtawati</h1>
            <p>17.05.2024 | Gianyar</p>
          </div>
        </div>
      </div>

      <div class="rounded overflow-hidden shadow-lg bg-white">
        <div class="p-5">
          <img
            class="w-full"
            src="/asset/dewa-tresna/CHE08496.jpg"
            alt="Sunset in the mountains"
          />

          <div class="px-6 py-4 text-center">
            <Saos
              animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
            >
              <h1 class="font-bold text-2xl mb-2">We Found Love</h1>
            </Saos>

            <Saos
              animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
            >
              <p class="text-gray-700 text-sm">
                “Ya, pasangan suami-istri, semoga anda tetap disini dan tidak
                pernah terpisahkan. Semoga anda berdua mencapai hidup yang penuh
                kebahagiaan. Semoga anda, bermain dengan anak-anak lakimu dan
                cucu-cucu lakimu, tinggal di rumah ini dengan gembira”
              </p>

              <p>(Rgveda : X.85.42)</p>
            </Saos>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="my-8">
    <div
      class="relative bg-white border border-gray-200 rounded-lg shadow mx-5"
    >
      <div class=" text-center p-10">
        <Saos
          animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
        >
          <h1>Sang Mempelai</h1>
        </Saos>
      </div>
      <div class="my-5">
        <Saos
          animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
        >
          <div class="flex items-start justify-center py-5">
            <img
              class="rounded-xl w-[50%] h-full object-cover"
              src="/asset/dewa-tresna/CHE08480.jpg"
              alt="Extra large avatar"
            />
          </div>
        </Saos>

        <div class=" text-center">
          <Saos
            animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
          >
            <h1>Dewa Gede Tresna Putra</h1>
          </Saos>
          <Saos
            animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
          >
            <p>Putra pertama dari pasangan</p>
            <p>Dewa Nyoman Rai & Cok Istri Sri Trisna Yanti</p>
            <p>Br.Sema, Desa Bitera, Gianyar</p>
          </Saos>
        </div>
        <div class="py-5">
          <h1>&</h1>
        </div>
        <Saos
          animation={isLoading
            ? "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
            : ""}
        >
          <div class="flex items-start justify-center py-5">
            <img
              class="rounded-xl w-[50%] h-full object-cover"
              src="/asset/dewa-tresna/CHE08483.jpg"
              alt="Extra large avatar"
            />
          </div>
        </Saos>

        <div class=" text-center">
          <Saos
            animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
          >
            <h1>Dewa Ayu Tirtawati</h1>
          </Saos>
          <Saos
            animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
          >
            <p>Putri ketiga dari pasangan</p>
            <p>Dewa Putu Sukra & Desak Putu Oka</p>
            <p>Br.Triwangsa, Desa Bitera, Gianyar</p>
          </Saos>
        </div>
      </div>
    </div>
  </section>

  <section class="my-8 bg-slate-100">
    <div class="p-5 text-center">
      <Saos
        animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
      >
        <h1 class="p-10">Om Swastyastu</h1>
      </Saos>
      <Saos
        animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
      >
        <p>
          Atas Asung Kerta Wara Nugraha Ida Sang Hyang Widhi Wasa kami bermaksud
          mengundang Bapak/Ibu/Saudara/i pada upacara Pawiwahan Putra dan Putri
          kami, yang diselenggarakan pada :
        </p>
      </Saos>

      <div class="py-5">
        <div
          style="background-image:linear-gradient(185deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.57) 100%), url('/asset/dewa-tresna/CHE08501.jpg') !important; background-position: 40% 50%;
        background-repeat: no-repeat;
        object-fit: cover;
        background-size: cover;
        height:50vh;
        border-radius: 10px;
      }"
        >
          <div class="flex items-center justify-center h-[50vh] text-white">
            <div>
              <Saos
                animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
              >
                <img
                  src="https://undanganwebmedia.sgp1.digitaloceanspaces.com/withlove/hi/2022/02/icon.png"
                  class="w-[4rem] h-[4rem] mx-auto"
                  alt=""
                />
                <span class="block text-center py-5">Pawiwahan</span>
                <hr />
                <div class="py-5">
                  <p class="text-center">Jumat, 17 Mei 2024</p>
                  <p class="text-center">09.00 WITA</p>
                </div>
              </Saos>
            </div>
          </div>
        </div>
      </div>

      <div class="py-5">
        <div
          style="background-image:linear-gradient(185deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.57) 100%), url('/asset/dewa-tresna/CHE08476.jpg') !important; background-position: 40% 50%;
        background-repeat: no-repeat;
        object-fit: cover;
        background-size: cover;
        height:50vh;
        border-radius: 10px;
      }"
        >
          <div class="flex items-center justify-center h-[50vh] text-white">
            <div>
              <Saos
                animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
              >
                <img
                  src="https://undanganwebmedia.sgp1.digitaloceanspaces.com/withlove/hi/2022/02/icon.png"
                  class="w-[4rem] h-[4rem] mx-auto"
                  alt=""
                />
                <h1 class="block text-center py-5">Resepsi Nikah</h1>
                <hr />

                <div class="py-5">
                  <p class="text-center">Jumat, 17 Mei 2024</p>
                  <p class="text-center">16.00 WITA - Selesai</p>
                </div>
                <hr />
                <h1 class="block text-center py-3">Lokasi</h1>

                <p class="text-center py-2">Br. Sema, Desa Bitera, Gianyar</p>

                <button class=" bg-white text-black px-4 py-2 rounded-lg">
                  <a href="https://maps.app.goo.gl/f96BNWHT7fSFCLDHA">
                    Denah lokasi
                  </a>
                </button>
              </Saos>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="roundedshadow-lg bg-white m-5 rounded-lg">
      <div class="p-5">
        <Saos
          animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
        >
          <img
            class="w-full rounded-lg"
            src="/asset/dewa-tresna/CHE08512.jpg"
            alt="Sunset in the mountains"
          />
        </Saos>

        <div class="px-6 py-4 text-center">
          <div class="font-bold text-xl mb-2">
            <Saos
              animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
            >
              <h1 class="text-2xl">Menuju Hari Bahagia</h1>
            </Saos>
          </div>
          <Saos
            animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
          >
            <p class="text-gray-700 text-base">
              Waktu berganti begitu cepat, dalam penantian kami yang penuh doa,
              kami berharap kehadiran dan doa restu seluruh keluarga, sahabat
              dan saudara terkasih, untuk menjadi saksi ikrar janji suci kami di
              hari bahagia
            </p>

            <p>(Rgveda : X.85.42)</p>
          </Saos>

          <div class="py-5">
            <div class="flex space-x-1 justify-center">
              <div>
                <h1>{daysLeft}</h1>
                <span class="text-sm text-gray-600"> Days</span>
              </div>
              <div>
                <h1>:</h1>
              </div>
              <div>
                <h1>{hoursLeft}</h1>
                <span class="text-sm text-gray-600">Hours</span>
              </div>
              <div>
                <h1>:</h1>
              </div>
              <div>
                <h1>{minutesLeft}</h1>
                <span class="text-sm text-gray-600">Minutes</span>
              </div>
              <div>
                <h1>:</h1>
              </div>
              <div>
                <h1>{secondsLeft}</h1>
                <span class="text-sm text-gray-600">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="bg-white">
    <Saos
      animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
    >
      <h1 class="py-8">Gallery</h1>
    </Saos>

    <div class="grid grid-cols-1 gap-5 px-5">
      <video src="/asset/dewa-tresna/ProShow.mp4" controls autoplay></video>
    </div>
  </section> -->

  <section>
    <div class="p-5 text-center">
      <Saos
        animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
      >
        <h1 class="p-10">RSVP</h1>
      </Saos>
      <Saos
        animation={"scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"}
      >
        <p>
          Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i dengan mengisi form
          berikut
        </p>
      </Saos>
    </div>
  </section>

  <section class="px-5">
    <form on:submit|preventDefault={submitForm}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            name="name"
            class="mt-1 p-2 block w-full border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label for="hadir" class="block text-sm font-medium text-gray-700"
            >Hadir</label
          >
          <select
            id="hadir"
            name="hadir"
            class="mt-1 p-2 block w-full border-gray-300 rounded-md"
          >
            <option value="true">Ya</option>
            <option value="false">Tidak</option>
          </select>
        </div>
        <div>
          <label for="pesan" class="block text-sm font-medium text-gray-700"
            >Pesan</label
          >
          <textarea
            id="pesan"
            name="pesan"
            class="mt-1 p-2 block w-full border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
      <div class="mt-6">
        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Submit</button
        >
      </div>
    </form>
  </section>

  <section class="py-5">
    <div class="p-5">
      {#if $rsvpData.length > 0}
        <ul
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {#each $rsvpData.sort((a, b) => b.created_at - a.created_at) as rsvp, index}
            <li>
              <div class="bg-white shadow-md rounded-lg p-4">
                <div class="flex items-center justify-between gap-4">
                  <h2 id="rsvpName" class="font-semibold text-base">
                    {rsvp.nama}
                  </h2>
                  <p class=" text-sm italic">
                    {formatRelativeDate(rsvp.created_at)}
                  </p>
                </div>
                <p id="rsvpMessage" class="text-gray-600 italic text-base py-2">
                  "{rsvp.pesan}"
                </p>

                <p
                  id="rsvpAttendance"
                  class="mb-2 px-1 rounded-full py-2 text-center"
                  style={rsvp.status
                    ? "background-color: green; color: white; width: 100px;"
                    : "background-color: red; color: white; width: 100px;"}
                >
                  {rsvp.status ? "Hadir" : "Tidak Hadir"}
                </p>
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-600">No RSVP data available.</p>
      {/if}
    </div>
    <div class="flex items-center justify-center space-x-4">
      <button
        class="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
        on:click={() => changePage($currentPage - 1)}
        disabled={$currentPage === 1}
      >
        Prev
      </button>
      <span class="text-gray-700">Page {$currentPage} of {$totalPages}</span>
      <button
        class="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
        on:click={() => changePage($currentPage + 1)}
        disabled={$currentPage === $totalPages}
      >
        Next
      </button>
    </div>
  </section>

  <footer class="bg-black py-4">
    <div class="container mx-auto text-center">
      <p class="text-white">
        &copy; 2024 Dewa Tresna & Dewa Ayu Tirtawati. All rights reserved.
      </p>
    </div>
  </footer>
{/if}

<style>
  @keyframes -global-from-left {
    0% {
      transform: rotateX(50deg) translateX(-200vw) skewX(-50deg);
      opacity: 1;
    }
    100% {
      transform: rotateX(0deg) translateX(0) skewX(0deg);
      opacity: 1;
    }
  }

  /* ----------------------------------------------
 * Animations below by Animista on 2020-7-11
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  @keyframes -global-scale-in-center {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes -global-rotate-in-center {
    0% {
      transform: rotate(-360deg);
      opacity: 0;
    }
    100% {
      transform: rotate(0);
      opacity: 1;
    }
  }

  @keyframes -global-slide-in-top {
    0% {
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes -global-slide-in-fwd-tr {
    0% {
      transform: translateZ(-1200px) translateY(-700px) translateX(500px);
      opacity: 0;
    }
    100% {
      transform: translateZ(0) translateY(0) translateX(0);
      opacity: 1;
    }
  }

  @keyframes -global-slide-in-elliptic-top-fwd {
    0% {
      transform: translateY(-600px) rotateX(-30deg) scale(0);
      transform-origin: 50% 100%;
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotateX(0) scale(1);
      transform-origin: 50% 1400px;
      opacity: 1;
    }
  }

  @keyframes -global-roll-in-left {
    0% {
      transform: translateX(-800px) rotate(-540deg);
      opacity: 0;
    }
    100% {
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes -global-roll-in-blurred-left {
    0% {
      transform: translateX(-1000px) rotate(-720deg);
      filter: blur(50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0) rotate(0deg);
      filter: blur(0);
      opacity: 1;
    }
  }

  @keyframes -global-tilt-in-fwd-tr {
    0% {
      transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px)
        skew(-35deg, 10deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
      opacity: 1;
    }
  }

  @keyframes -global-swing-in-top-fwd {
    0% {
      transform: rotateX(-100deg);
      transform-origin: top;
      opacity: 0;
    }
    100% {
      transform: rotateX(0deg);
      transform-origin: top;
      opacity: 1;
    }
  }

  @keyframes -global-puff-in-center {
    0% {
      transform: scale(2);
      filter: blur(4px);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
    }
  }

  @keyframes -global-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* EXITS */
  @keyframes -global-scale-out-center {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 1;
    }
  }

  @keyframes -global-rotate-out-center {
    0% {
      transform: rotate(0);
      opacity: 1;
    }
    100% {
      transform: rotate(-360deg);
      opacity: 0;
    }
  }

  @keyframes -global-rotate-out-2-cw {
    0% {
      transform: rotate(0);
      opacity: 1;
    }
    100% {
      transform: rotate(45deg);
      opacity: 0;
    }
  }

  @keyframes -global-swirl-out-bck {
    0% {
      transform: rotate(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(-540deg) scale(0);
      opacity: 0;
    }
  }

  @keyframes -global-flip-out-hor-top {
    0% {
      transform: rotateX(0);
      opacity: 1;
    }
    100% {
      transform: rotateX(70deg);
      opacity: 0;
    }
  }

  @keyframes -global-slide-out-top {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-1000px);
      opacity: 0;
    }
  }

  @keyframes -global-slide-out-fwd-center {
    0% {
      transform: translateZ(1);
      opacity: 1;
    }
    100% {
      transform: translateZ(600px);
      opacity: 0;
    }
  }

  @keyframes -global-slide-out-elliptic-top-bck {
    0% {
      transform: translateY(0) rotateX(0) scale(1);
      transform-origin: 50% 1400px;
      opacity: 1;
    }
    100% {
      transform: translateY(-600px) rotateX(-30deg) scale(0);
      transform-origin: 50% 100%;
      opacity: 1;
    }
  }
</style>
