<x-app-layout>
    <div class="container mt-4 container-style">

        <div class="container">
            <h2>Employees</h2>

            {{-- <a href="{{ route('employees.store') }}" class="mb-3 btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#createEmployeeModel">Add Employee</a> --}}

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEmployeeModel">
                Add Department
            </button>

            <table class="table mt-8">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Department</th>

                    </tr>
                </thead>
                <tbody>
                    @if (count($employees) > 0)
                        @php
                            $i = 0;
                        @endphp
                        @foreach ($employees as $employee)
                            <tr>
                                <td>{{ ++$i }}</td>
                                <td>{{ $employee->department->name }}</td>
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
            <div class="modal fade" id="createEmployeeModel" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="examplModalLabel">Create Department</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> <span
                                    aria-hidden="true">&times;</span></button>
                        </div>

                        <form id="createEmployeeForm">
                            @csrf
                            <div class="modal-body">

                                {{-- <input type="hidden" name="user_id" value="{{ Auth::user()->id }}"> --}}

                                <label for="department_id">Department:</label>
                                <select name="department_id" id="department_id" class="mb-2 w-100" required>
                                    <option value="">Select Department</option>
                                    @foreach ($departments as $department)
                                        <option value="{{ $department->id }}">{{ $department->name }}</option>
                                    @endforeach
                                </select>


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
