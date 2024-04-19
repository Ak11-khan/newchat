<x-app-layout>
    <div class="container mt-4 container-style">
        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
            <a href="{{ route('employees.index') }}" class="btn btn-primary">Show Employees</a>
        @else
            <form action="{{ route('employees.store') }}" method="post">
                @csrf
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="{{ Auth::user()->name }}" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="{{ Auth::user()->email }}" required>
                </div>
                <div>
                    <label for="department_id">Department:</label>
                    <select name="department_id" id="department_id" required>
                        <option value="">Select Department</option>
                        @foreach ($departments as $department)
                            <option value="{{ $department->id }}">{{ $department->name }}</option>
                        @endforeach
                    </select>
                </div>
                <button type="submit">Create Employee</button>
            </form>
        @endif
    </div>
</x-app-layout>
