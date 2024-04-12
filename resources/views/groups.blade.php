<x-app-layout>
    <div class="container mt-4 container-style">

        <h1>Groups</h1>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createGroupModel">
            Create Group
        </button>



        <table class="table">
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Members</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                @if (count($groups) > 0)
                    @php
                        $i = 0;
                    @endphp
                    @foreach ($groups as $group)
                        <tr>

                            <td>{{ ++$i }}</td>
                            <td><img src="{{ $group->image }}" alt="{{ $group->name }}" width="100px" height="100px">
                            </td>
                            <td>{{ $group->name }}</td>
                            <td>{{ $group->join_limit }}</td>
                            <td>{{ $group->join_limit }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="6">No Group Found!</th>

                    </tr>
                @endif


            </tbody>
        </table>


        <!-- Modal -->
        <div class="modal fade" id="createGroupModel" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create Group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form enctype="multipart/form-data" id="createGroupForm">
                        <div class="modal-body">
                            <input type="text" name="name" placeholder="Enter Group Name.." class="w-100 mb-2"
                                required>
                            <input type="file" name="image" class="w-100 mb-2" required>
                            <input type="number" name="limit" min="1" class="w-100 mb-2" required
                                placeholder="Enter User Limit..">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</x-app-layout>
