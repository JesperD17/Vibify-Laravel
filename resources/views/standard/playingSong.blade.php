<playingSong>
    <div class="songInfo">
        <img class="skeletons"></img>
        <div class="text">
            <div class="songTitle">title</div>
            <div class="songAuthor">Author</div>
        </div>
    </div>

    <div class="centerPlayingWrapper">
        <div class="actionMenu">
            <i class='bx bx-skip-previous'></i>
            <i class='bx bx-pause'></i>
            <i class='bx bx-skip-next'></i>
        </div>
        {{-- <div class="progressMenu">
            <div class="progressDone">0:00</div>
            <div class="progressBar"></div>
            <div class="progressLeft">0:00</div>
        </div> --}}
        <audio controls>
            <source type="audio/mp4">
            Your browser does not support the audio element.
        </audio>
    </div>

    <div class="volume">
        <i class='bx bx-bookmark' ></i>
    </div>
</playingSong>