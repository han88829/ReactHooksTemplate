import React, { Component } from "react";
import { Input, Button, message } from "antd";
import "./index.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      tab: "login",
      data: {
        mobile: "",
        num: "",
        password: "",
        newPassword: "",
        name: ""
      },
      numTxt: "获取验证码"
    };
  }

  componentDidMount() {
    document.title = "登录";
    function Star(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 2) + 1;
      var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
      this.color = "rgba(255,255,255," + alpha + ")";
    }

    Star.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };

    Star.prototype.move = function () {
      this.y -= 0.15;
      if (this.y <= -10) this.y = HEIGHT + 10;
      this.draw();
    };

    Star.prototype.die = function () {
      stars[this.id] = null;
      delete stars[this.id];
    };

    function Dot(id, x, y, r) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.r = Math.floor(Math.random() * 5) + 1;
      this.maxLinks = 2;
      this.speed = 0.5;
      this.a = 0.5;
      this.aReduction = 0.005;
      this.color = "rgba(255,255,255," + this.a + ")";
      this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

      this.dir = Math.floor(Math.random() * 140) + 200;
    }

    Dot.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.r * 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    };

    Dot.prototype.link = function () {
      if (this.id == 0) return;
      var previousDot1 = getPreviousDot(this.id, 1);
      var previousDot2 = getPreviousDot(this.id, 2);
      var previousDot3 = getPreviousDot(this.id, 3);
      if (!previousDot1) return;
      ctx.strokeStyle = this.linkColor;
      ctx.moveTo(previousDot1.x, previousDot1.y);
      ctx.beginPath();
      ctx.lineTo(this.x, this.y);
      if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
      if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
      ctx.stroke();
      ctx.closePath();
    };

    function getPreviousDot(id, stepback) {
      if (id == 0 || id - stepback < 0) return false;
      if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
      else return false; //getPreviousDot(id - stepback);
    }

    Dot.prototype.move = function () {
      this.a -= this.aReduction;
      if (this.a <= 0) {
        this.die();
        return;
      }
      this.color = "rgba(255,255,255," + this.a + ")";
      this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
      (this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed);
      (this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed);

      this.draw();
      this.link();
    };

    Dot.prototype.die = function () {
      dots[this.id] = null;
      delete dots[this.id];
    };

    var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      WIDTH,
      HEIGHT,
      mouseMoving = false,
      mouseMoveChecker,
      mouseX,
      mouseY,
      stars = [],
      initStarsPopulation = 80,
      dots = [],
      dotsMinDist = 2,
      maxDistFromCursor = 50;

    setCanvasSize();
    init();

    function setCanvasSize() {
      (WIDTH = document.documentElement.clientWidth);
      (HEIGHT = document.documentElement.clientHeight);

      canvas.setAttribute("width", WIDTH);
      canvas.setAttribute("height", HEIGHT);
    }

    function init() {
      ctx.strokeStyle = "white";
      ctx.shadowColor = "white";
      for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(
          i,
          Math.floor(Math.random() * WIDTH),
          Math.floor(Math.random() * HEIGHT)
        );
        //stars[i].draw();
      }
      ctx.shadowBlur = 0;
      animate();
    }

    function animate() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      for (var i in stars) {
        stars[i].move();
      }
      for (var i in dots) {
        dots[i].move();
      }
      drawIfMouseMoving();
      requestAnimationFrame(animate);
    }

    window.onmousemove = function (e) {
      mouseMoving = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      clearInterval(mouseMoveChecker);
      mouseMoveChecker = setTimeout(function () {
        mouseMoving = false;
      }, 100);
    };

    function drawIfMouseMoving() {
      if (!mouseMoving) return;

      if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
      }

      var previousDot = getPreviousDot(dots.length, 1);
      var prevX = previousDot.x;
      var prevY = previousDot.y;

      var diffX = Math.abs(prevX - mouseX);
      var diffY = Math.abs(prevY - mouseY);

      if (diffX < dotsMinDist || diffY < dotsMinDist) return;

      var xVariation = Math.random() > 0.5 ? -1 : 1;
      xVariation =
        xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
      var yVariation = Math.random() > 0.5 ? -1 : 1;
      yVariation =
        yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
      dots[dots.length] = new Dot(
        dots.length,
        mouseX + xVariation,
        mouseY + yVariation
      );
      dots[dots.length - 1].draw();
      dots[dots.length - 1].link();
    }
    //setInterval(drawIfMouseMoving, 17);

    function degToRad(deg) {
      return deg * (Math.PI / 180);
    }
  }

  submit = () => {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true
    });
    // 登录
    if (this.state.tab === "login") {
      let { email, password } = this.state;

      if (!password || !email) {
        message.error("内容不能为空！", 1, () => {
          this.setState({
            loading: false
          });
        });
        return;
      }
    
      message.info('登录成功!');
      sessionStorage.setItem('user',JSON.stringify({name:email}));
      this.props.history.push('/user')
    } else {
      let data = this.state.data;
      if (!data.mobile || !data.password || !data.newPassword || !data.name) {
        message.error("内容不能为空", 1);
        this.setState({
          loading: false
        });
        return;
      }

      if (data.password != data.newPassword) {
        message.error("两次输入的密码不一致", 1);
        this.setState({
          loading: false
        });
        return;
      }
      data = {
        account: data.mobile,
        password: data.password,
        name: data.name
      }; 
      sessionStorage.setItem('user',JSON.stringify(data));     
      this.props.history.push('/user')
    }
  };

  render() {
    return (
      <div className="assort login">
        <canvas id="canvas" />
        <div className="login-content">
          <div className="login-tab">
            <div
              className={`login-tab-left  ${
                this.state.tab === "login" ? "login-tab-select" : ""
                }`}
              onClick={() => {
                document.title = "登录";
                this.setState({
                  tab: "login"
                });
              }}
            >
              登录
            </div>
            <div
              className={`login-tab-right  ${
                this.state.tab === "registered" ? "login-tab-select" : ""
                }`}
              onClick={() => {
                document.title = "注册";
                this.setState({
                  tab: "registered"
                });
              }}
            >
              注册
            </div>
          </div>
          <div
            className="login-content-input"
            style={{
              marginTop: 10,
              padding: "10px 0",
              display: this.state.tab === "login" ? "" : "none"
            }}
          >
            <Input
              placeholder="请输入帐号"
              className="email login-input"
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value || ""
                });
              }}
            />
            <Input
              type="password"
              className="password login-input"
              placeholder="请输入密码"
              value={this.state.password}
              onChange={e => {
                this.setState({
                  password: e.target.value || ""
                });
              }}
            />
          </div>
          <div
            className="login-content-input"
            style={{
              marginTop: 10,
              padding: "10px 0",
              display: this.state.tab === "registered" ? "" : "none"
            }}
          >
            <Input
              placeholder="请输入名称"
              className="email login-input"
              value={this.state.data.name}
              onChange={e => {
                let data = { ...this.state.data, name: e.target.value };
                this.setState({
                  data
                });
              }}
            />
            <Input
              placeholder="请输入帐号"
              className="email login-input"
              value={this.state.data.mobile}
              onChange={e => {
                let data = { ...this.state.data, mobile: e.target.value };
                this.setState({
                  data
                });
              }}
            />
            <Input
              type="password"
              className="password login-input"
              placeholder="请输入密码"
              value={this.state.data.password}
              onChange={e => {
                let data = { ...this.state.data, password: e.target.value };
                this.setState({
                  data
                });
              }}
            />
            <Input
              type="password"
              className={`password login-input ${
                this.state.data.password &&
                  this.state.data.newPassword &&
                  this.state.data.password != this.state.data.newPassword
                  ? "login-error"
                  : ""
                }`}
              placeholder="请再次输入密码"
              value={this.state.data.newPassword}
              onChange={e => {
                let data = { ...this.state.data, newPassword: e.target.value };
                this.setState({
                  data
                });
              }}
            />
          </div>
          <Button
            className="login-btn"
            type="primary"
            loading={this.state.loading}
            onClick={this.submit}
          >
            {this.state.tab === "login" ? "登录" : "注册"}
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
