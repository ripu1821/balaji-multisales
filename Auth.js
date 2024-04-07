var signInButton = document.getElementById("signInBtn");
var signOutButton = document.getElementById("signOutBtn");
var username = document.getElementById("username");
var pass = document.getElementById("password");
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkenFoamJrdGtveWRobmpud3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0ODYzODcsImV4cCI6MjAyODA2MjM4N30.8SxMTA8Gma05ccO7ZKHGJqVLPQLOpQbvlvDRkh1ta54";
const supabaseUrl = "https://edzqhjbktkoydhnjnwqw.supabase.co";
const database = supabase.createClient(supabaseUrl, supabaseKey);
const { auth } = database;


// signig in the user
signInButton.addEventListener("click", async () => {
  // const email = 'codingwizardsolution@gmail.com';
  // const password = 'Direct@portal29';

  const email = username.value;
  const password = pass.value;

  try {
    const { data, error } = await auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      alert("Invalid email or password.");
    } else {
      console.log("User signed in successfully:", data?.user);
      console.log("Session:", data?.session);
      if (data?.user && data?.session) {
        localStorage.setItem("isLoggedIn", "true");
        updateContentVisibility();
      }
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
});

// signing out the user 
signOutButton.addEventListener("click", async () => {
  try {
    const { error } = await auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully");
      localStorage.removeItem("isLoggedIn");
      updateContentVisibility();
      alert("Logged out successfully.");
    }
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
});

// Function to check if the user is authenticated
function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Function to show/hide content based on authentication status
function updateContentVisibility() {
  if (isAuthenticated()) {
    document.getElementById("content").style.display = "block";
    document.getElementById("loginFormdiv").style.display = "none";
  } else {
    document.getElementById("content").style.display = "none";
    document.getElementById("loginFormdiv").style.display = "block";
  }
}

// Initial setup: Update content visibility based on authentication status
updateContentVisibility();
