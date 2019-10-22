import React, { Component } from 'react';
import './SideBar.css';
class SideBar extends Component {
  render() {
      return (
        <div class="sidebar-container sticky-top">
        <ul class="sidebar-navigation">
            <li>
            <a href="#">
                <i class="fa fa-home" aria-hidden="true"></i> Homepage
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-users" aria-hidden="true"></i> Friends
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-cog" aria-hidden="true"></i> Settings
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-info-circle" aria-hidden="true"></i> Information
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-info-circle" aria-hidden="true"></i> test1
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-info-circle" aria-hidden="true"></i> test2
            </a>
            </li>
            <li>
            <a href="#">
                <i class="fa fa-info-circle" aria-hidden="true"></i> test3
            </a>
            </li>
        </ul>
        </div>
      );
    }
  }

  export default SideBar;
