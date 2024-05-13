import { c as create_ssr_component, a as subscribe, o as onDestroy, e as escape } from "../../chunks/ssr.js";
import { createClient } from "@supabase/supabase-js";
import { w as writable } from "../../chunks/index2.js";
const css = {
  code: "@keyframes from-left{0%{transform:rotateX(50deg) translateX(-200vw) skewX(-50deg);opacity:1}100%{transform:rotateX(0deg) translateX(0) skewX(0deg);opacity:1}}@keyframes scale-in-center{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes rotate-in-center{0%{transform:rotate(-360deg);opacity:0}100%{transform:rotate(0);opacity:1}}@keyframes slide-in-top{0%{transform:translateY(-1000px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes slide-in-fwd-tr{0%{transform:translateZ(-1200px) translateY(-700px) translateX(500px);opacity:0}100%{transform:translateZ(0) translateY(0) translateX(0);opacity:1}}@keyframes slide-in-elliptic-top-fwd{0%{transform:translateY(-600px) rotateX(-30deg) scale(0);transform-origin:50% 100%;opacity:0}100%{transform:translateY(0) rotateX(0) scale(1);transform-origin:50% 1400px;opacity:1}}@keyframes roll-in-left{0%{transform:translateX(-800px) rotate(-540deg);opacity:0}100%{transform:translateX(0) rotate(0deg);opacity:1}}@keyframes roll-in-blurred-left{0%{transform:translateX(-1000px) rotate(-720deg);filter:blur(50px);opacity:0}100%{transform:translateX(0) rotate(0deg);filter:blur(0);opacity:1}}@keyframes tilt-in-fwd-tr{0%{transform:rotateY(20deg) rotateX(35deg) translate(300px, -300px)\n        skew(-35deg, 10deg);opacity:0}100%{transform:rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);opacity:1}}@keyframes swing-in-top-fwd{0%{transform:rotateX(-100deg);transform-origin:top;opacity:0}100%{transform:rotateX(0deg);transform-origin:top;opacity:1}}@keyframes puff-in-center{0%{transform:scale(2);filter:blur(4px);opacity:0}100%{transform:scale(1);filter:blur(0px);opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes scale-out-center{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:1}}@keyframes rotate-out-center{0%{transform:rotate(0);opacity:1}100%{transform:rotate(-360deg);opacity:0}}@keyframes rotate-out-2-cw{0%{transform:rotate(0);opacity:1}100%{transform:rotate(45deg);opacity:0}}@keyframes swirl-out-bck{0%{transform:rotate(0) scale(1);opacity:1}100%{transform:rotate(-540deg) scale(0);opacity:0}}@keyframes flip-out-hor-top{0%{transform:rotateX(0);opacity:1}100%{transform:rotateX(70deg);opacity:0}}@keyframes slide-out-top{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-1000px);opacity:0}}@keyframes slide-out-fwd-center{0%{transform:translateZ(1);opacity:1}100%{transform:translateZ(600px);opacity:0}}@keyframes slide-out-elliptic-top-bck{0%{transform:translateY(0) rotateX(0) scale(1);transform-origin:50% 1400px;opacity:1}100%{transform:translateY(-600px) rotateX(-30deg) scale(0);transform-origin:50% 100%;opacity:1}}",
  map: null
};
const supabaseUrl = "https://ngshwkayjjxfiidmwgyo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc2h3a2F5amp4ZmlpZG13Z3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzYyMjAsImV4cCI6MjAyNzgxMjIyMH0.mFE4aT-yeBQ_K8MR-UyaINhoUKfd-TyLUADEVH0vOmI";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentPage;
  let $$unsubscribe_rsvpData;
  let $$unsubscribe_totalPages;
  const rsvpData = writable([]);
  $$unsubscribe_rsvpData = subscribe(rsvpData, (value) => value);
  const currentPage = writable(1);
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => value);
  const totalPages = writable(1);
  $$unsubscribe_totalPages = subscribe(totalPages, (value) => value);
  let queryParams = "";
  const updateCountdown = () => {
  };
  const interval = setInterval(updateCountdown, 1e3);
  onDestroy(() => {
    clearInterval(interval);
  });
  createClient(supabaseUrl, supabaseKey);
  $$result.css.add(css);
  $$unsubscribe_currentPage();
  $$unsubscribe_rsvpData();
  $$unsubscribe_totalPages();
  return `${$$result.head += `<!-- HEAD_svelte-8gb88t_START -->${$$result.title = `<title>Home</title>`, ""}<meta name="description" content="Svelte demo app"><!-- HEAD_svelte-8gb88t_END -->`, ""} ${`<section class="banner px-5 py-5 h-screen" style="background-image: url('/asset/dewa-tresna/CHE08467.jpg') !important; background-position: 40% 10%; background-repeat: no-repeat; object-fit: cover; background-size: cover; }"><div class="head relative top-0 h-[65vh]" data-svelte-h="svelte-i40zpt"><div class="text-center text-white"><h4 class="py-5">The Wedding Of</h4> <h1 class="text-4xl">Dewa Tresna &amp; Dewa Ayu Tirtawati</h1></div></div> <div class="footer relative bottom-0 text-white"><div class="text-center"><h1><p>${escape(queryParams)}</p></h1> <p class="py-5" data-svelte-h="svelte-xenhc2">Mohon maaf bila ada kesalahan pada penulisan nama/gelar</p> <button class="bg-white text-black rounded-lg px-5 py-4" data-svelte-h="svelte-1f12njs">Open Invitation</button></div></div></section>`}`;
});
export {
  Page as default
};
