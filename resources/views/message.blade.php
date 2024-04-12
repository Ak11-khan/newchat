<x-app-layout>
    <div class="container mt-4 container-style">
        hello how are you

        <div class="row">




            <div class="col-md-3">
                <ul class="list-group">
                    <form id="searchForm">
                        <input type="text" id="searchInput" placeholder="Search users...">
                        {{-- <button type="submit">Search</button> --}}
                    </form>


                    @foreach ($messages as $message)
                        <li class="cursor-pointer">
                            {{ $message->id }}

                        </li>
                        <!-- Accessing employee data -->
                    @endforeach
                </ul>
            </div>
            <div class="col-md-9">
                <h1 class="flex items-center justify-center text-3xl text-gray-800 start-head">Click User to
                    start
                    chat</h1>
                <div class="chat-section">
                    <div id="chat-container">

                    </div>
                    <form action="" id="chat-form">
                        <input type="text" name="message" placeholder="Enter Message" id="message"
                            class="mt-4 border rounded" required style="width: 80%">
                        <input type="submit" value="Send Message" class="p-2 m-2 text-white bg-blue-500 rounded">
                    </form>
                </div>
            </div>

            <div class="col-md-12">
                <h6>Users not found!? </h6>
            </div>

        </div>


    </div>
</x-app-layout>
