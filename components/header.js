
import Link from 'next/link';
import Image from 'next/image';
import {signIn, signOut, useSession} from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCogs, faUserTie } from '@fortawesome/free-solid-svg-icons'

import {
    Nav,
    Navbar,
    Badge,
    NavItem,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()

    console.log(session);

    return (
        <header className="pb-5 mb-5">
            <Navbar style={{ height: 80 }} light expand="md" fixed="top" className="d-flex justify-content-between color_navbar">
                <Link href="/">
                    <a className="text-white d-flex align-items-center">
                        <Image src="/spacex-logo.svg" width={250} height={80} alt="logo" />
                    </a>
                </Link>
                <Nav className="d-flex align-items-center" navbar>
                    <Link href="/employees">
                        <a className="pointer" >
                            <NavItem className="border-0 mr-4" >
                                <FontAwesomeIcon className="mr-2" icon={faUserTie} />
                                Employees
                            </NavItem>
                        </a>
                    </Link>
                    <Link href="/private/characters">
                        <a className="pointer" >
                            <NavItem className="border-0 mr-4" >
                                <FontAwesomeIcon className="mr-2" icon={faChartLine} />
                                Characters
                            </NavItem>
                        </a>
                    </Link>
                    <Link href="/setting">
                        <a className="pointer" >
                            <NavItem className="border-0 mr-4" >
                                <FontAwesomeIcon className="mr-2" icon={faCogs} />
                                Setting
                            </NavItem>
                        </a>
                    </Link>
                </Nav>
                <UncontrolledDropdown inNavbar>
                    {!session && <>
                        <Badge
                            color="warning"
                            pill
                            className="p-3 pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                signIn();
                            }}
                        >
                            Sign In
                        </Badge>
                    </>}
                    {session && <>
                        <DropdownToggle nav caret className="d-flex justify-content-between align-items-center">
                            <Image src={session.user.image} width={60} height={60} className="rounded-circle" />
                            <span className="ml-3">{session.user.name}</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link href="/user" >
                                    <a className="text-dark">Profile</a>
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                Setting
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={event => {
                                event.preventDefault();
                                signOut();
                            }}>
                                LogOut
                            </DropdownItem>
                        </DropdownMenu>
                    </>}
                </UncontrolledDropdown>
            </Navbar>
        </header>
    );
}
