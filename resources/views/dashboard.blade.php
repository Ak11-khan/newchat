<x-app-layout>
    <div class="container mt-4 container-style">
        <div class="row">


            @if (count($users) > 0)

                <div class="col-md-3">
                    <ul class="list-group">
                        <form id="searchForm">
                            <input type="text" id="searchInput" class="w-full" placeholder="Search users...">
                            {{-- <button type="submit">Search</button> --}}
                        </form>


                        @foreach ($users as $user)
                            @php
                                if ($user->image != '' && $user->image != null) {
                                    $image = $user->image;
                                } else {
                                    $image = 'images/dummy.png';
                                }

                            @endphp

                            <li class="cursor-pointer list-group-item list-group-item-dark user-list"
                                data-id="{{ $user->id }}">
                                {{-- today --}}
                                <input type="checkbox" class="user-checkbox" value="{{ $user->id }}">
                                {{-- today --}}
                                <img src="{{ $image }}" alt="image-profile" class="rounded-full user-image">
                                {{ $user->name }}
                                <sup id="{{ $user->id }}-status" class="offline-status">●</sup>
                                <!-- Access latest department name -->
                                {{-- <p>{{ $user->department->name }}</p> --}}
                                {{-- same way of writing  --}}
                                {{-- <p>{{ optional($user->employee)->department->name }}</p> --}}
                                <p>{{ optional($user->latestDepartment())->name }}</p>

                            </li>
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
            @else
                <div class="col-md-12">
                    <h6>Users not found!? </h6>
                </div>
            @endif
        </div>


    </div>
</x-app-layout>
