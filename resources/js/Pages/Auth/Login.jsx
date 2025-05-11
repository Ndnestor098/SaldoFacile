import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('email', 'password'),
        });
    };
    return (
        <main className="flex min-h-screen w-screen items-center justify-around bg-gray-50">
            <Head title="Login" />
            <section
                className="hidden h-screen w-1/2 bg-cover bg-center bg-no-repeat lg:block"
                style={{
                    backgroundImage:
                        "url('assets/images/background_login.webp')",
                }}
            >
                <div className="h-full w-full bg-black bg-opacity-50"></div>
            </section>
            <Link
                href={route('home')}
                className="absolute right-3 top-3 flex flex-col items-center justify-center"
            >
                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 fill-black"
                >
                    <path d="M12 0a1.44 1.44 0 0 0-.947.399L.547 10.762a1.26 1.26 0 0 0-.342.808v11.138c0 .768.53 1.292 1.311 1.292h20.968c.78 0 1.311-.522 1.311-1.292V11.57a1.25 1.25 0 0 0-.34-.804L15.68 3.097h-.001L12.947.4A1.454 1.454 0 0 0 12 0Zm0 6.727 6.552 6.456v5.65H5.446v-5.65z" />
                </svg>
                <span className="text-sm font-medium">Home</span>
            </Link>
            <section className="flex h-screen w-1/2 flex-col items-center justify-center gap-4 bg-white">
                <form
                    onSubmit={submit}
                    className="flex w-96 flex-col gap-4 rounded-lg p-10"
                >
                    <h1 className="text-center text-3xl font-bold text-quaternary">
                        Login
                    </h1>
                    <p className="text-center text-gray-700">
                        By logging in, you accept our terms and privacy policy.
                    </p>
                    <label htmlFor="email" className="flex flex-col">
                        <span className="font-bold text-quaternary">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            id="email"
                            placeholder="Email"
                            className="rounded-lg focus:shadow-lg"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </label>
                    <label htmlFor="password" className="flex flex-col">
                        <span className="font-bold text-quaternary">
                            Password
                        </span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Password"
                            className="rounded-lg focus:shadow-lg"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </label>
                    <button
                        type="submit"
                        className="rounded-lg bg-sixth py-2 font-bold text-primary duration-300 hover:shadow-lg"
                    >
                        {processing ? 'Submitting...' : 'Login'}
                    </button>
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full items-center space-x-2">
                            <hr className="w-full flex-grow border-black" />
                            <img
                                src="/assets/images/pig.png"
                                width="25"
                                alt="OR"
                                draggable="false"
                            />
                            <hr className="w-full flex-grow border-zinc-700" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-sixth">
                                Don't have account?
                            </span>
                            <Link
                                href={route('register')}
                                className="text-sm font-semibold text-sixth"
                            >
                                Register Here
                            </Link>
                        </div>
                        <button
                            onClick={() =>
                                (window.location.href = route('google'))
                            }
                            className="border-input inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border bg-[#4285F4] px-4 py-2 text-sm font-medium text-white duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-center">
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5 fill-white"
                                >
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                Login with Google
                            </div>
                        </button>
                        {/* <button className="border-input inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border bg-[#5865F2] px-4 py-2 text-sm font-medium text-white duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-center">
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5 fill-white"
                                >
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                </svg>
                                Login with Discord
                            </div>
                        </button> */}
                    </div>
                </form>
            </section>
        </main>
    );
}
