//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=//
//=                                                           =//
//=  Copyright (C) 1998-2004 WEST MiRa. All rights reserved.  =//
//=            WEST MiRa http://www.west-mira.jp/            =//
//=                                                           =//
//=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=//


	start_han = 0;
	attack = 0;
	goal_num = 0;
	sele_num = 0;
	now_col = 0;
	button_cen = 0;
	button_cen = Math.floor(max_cou / 2);
	timer = 0;
	function Counts(dore)
		{
		if(start_han == 0)
			{
			start_han = 1;

			goal_num = Math.floor(Math.random() * (max_num - min_num) + min_num);
			choice_cou = Math.floor(Math.random() * (max_cou - min_cou) + min_cou);

			mojis  = 'アウト数は「 ' + goal_num + ' 」です。\n';
			mojis += 'カウントは「 ' + choice_cou + '回 」以内です。\n';
			document.form1.text1.value = mojis;
			document.form1.elements['button' + button_cen].value = 'OK';
			}

		else if(start_han == 1)
			{
			start_han = 2;

			mojis  = '先攻、後攻を決めます。\n';
			mojis += '○か×を選択して下さい。\n';
			document.form1.text1.value = mojis;
			document.form1.elements['button' + button_cen].value = '○';
			document.form1.elements['button' + (button_cen + 1)].value = '×';

			if((document.getElementById) && (!document.all)){
				document.getElementById('button' + (button_cen + 1)).style.display="inline";
				}
			else {
				document.all('button' + (button_cen + 1)).style.display="inline";
				}
			}

		else if(start_han < 20)
			{
			if(start_han == 2)
				{
				attack = dore;
				ButtonHidden();
				}

			if(Math.floor(Math.random() * 2) == 0)
				{
				mojis = '○\n';
				}
			else
				{
				mojis = '×\n';
				}
			document.form1.text1.value = mojis;

			start_han++;
			clearTimeout(timer);
			timer = setTimeout('Counts();' , 80);
			}

		else if(start_han == 20)
			{
			mojis  = '';

			dore = (Math.floor(Math.random() * max_num)) % 2;
			if(dore == 0){ mojis += '○\n'; }
			else { mojis += '×\n'; }

			if(Math.floor(attack % 2) == dore)
				{
				attack = 1;
				mojis += '当たりです。\n先攻、後攻を選んで下さい。\n\n';
				document.form1.text1.value = mojis;
				start_han++;

				document.form1.elements['button' + button_cen].value = '先攻';
				document.form1.elements['button' + (button_cen + 1)].value = '後攻';

				if((document.getElementById) && (!document.all))
					{
					document.getElementById('button' + (button_cen)).style.display="inline";
					document.getElementById('button' + (button_cen + 1)).style.display="inline";
					}
				else
					{
					document.all('button' + (button_cen)).style.display="inline";
					document.all('button' + (button_cen + 1)).style.display="inline";
					}
				}
			else
				{
				attack = 0;
				mojis += '外れました。\n先攻、後攻を決めます...\n\n';
				document.form1.text1.value = mojis;

				start_han++;
				clearTimeout(timer);
				timer = setTimeout('Counts();' , 2000);
				}
			}

		else if(start_han == 21)
			{
			if(attack == 1)
				{
				if(dore % 2 == 0)
					{ mojis += '貴方は先攻です。\n'; }
				else
					{
					mojis += '貴方は後攻です。\n';
					start_han++;
					}
				attack = 1;
				}
			else
				{
				if(Math.floor(Math.random() * max_num) % 2 == 0)
					{ mojis += '貴方は先攻です。\n'; }
				else
					{
					mojis += '貴方は後攻です。\n';
					start_han++;
					}
				attack = 0;
				}
			document.form1.text1.value = mojis;
			ButtonHidden();

			start_han++;
			clearTimeout(timer);
			timer = setTimeout('Counts();' , 2000);
			}

		else if(start_han > 21)
			{
			mojis  = 'アウト数：' + goal_num + '\n';
			mojis += 'カウント：' + choice_cou + '\n********************\n';

			if(start_han % 2 == 0)
				{
				for(i = 0; i < choice_cou; i++)
					{
					if((document.getElementById) && (!document.all))
						document.getElementById('button' + i).style.display="inline";
					else
						document.all('button' + i).style.display="inline";
					document.form1.elements['button' + i].value = now_col + i + 1;
					if(i + now_col > goal_num - 2){ break; }
					}
				mojis += '数を選択して下さい。\n';
				document.form1.text1.value = mojis;
				start_han++;
				}

			else
				{
				ButtonHidden();

				taihi = now_col;
				for(i = 0; i < choice_cou; i++)
					{
					if(dore == i)
						{
						now_col = eval(document.form1.elements['button' + i].value);
						break;
						}
					}

				if(now_col == '')
					{
					now_col = 0;
					}
				else
					{
					mojis += 'PLAYER：';
					for(i = taihi + 1; i < now_col + 1; i++)
						{
						mojis  += i + ' ';
						}
					mojis += '\n';
					document.form1.text1.value = mojis;
					}

				if(now_col >= goal_num)
					{ GameEnd(); }
				else
					{
					taihi = now_col;

					sele_num = goal_num - 1;
					while(sele_num > now_col + choice_cou + 1)
						{
						sele_num -= (choice_cou + 1);
						}
					dore = 0;
					for(i = now_col; i < now_col + choice_cou + 1; i++)
						{
						if(sele_num == i)
							{
							now_col = i;
							dore = 1;
							break;
							}
						}
					if(dore == 0){ now_col += Math.floor(Math.random() * (choice_cou - 1)); }
					if(now_col < 1){ SystemError(); }

					mojis += 'COM：';
					for(i = taihi + 1; i < now_col + 1; i++)
						{
						mojis  += i + ' ';
						}
					mojis += '\n';

					document.form1.text1.value = mojis;

					start_han++;

					clearTimeout(timer);
					if(now_col >= goal_num){ GameEnd(); }
					else { timer = setTimeout('Counts();' , 2000); }
					}
				}
			}
		}

	function ComTurn()
		{
		}

	function GameEnd()
		{
		ButtonHidden();
		clearTimeout(timer);

		if(start_han > 21)
			{
			if(start_han % 2 == 0)
				{
				document.form1.text1.value = GOAL_MESSAGE1;
				start_han = 0;
				if(GOAL_ACTION == 1)timer = setTimeout('location.href=GOAL_URL1;' , 2500);
				}
			else
				{
				document.form1.text1.value = GOAL_MESSAGE2;
				start_han = 0;
				if(GOAL_ACTION == 1)timer = setTimeout('location.href=GOAL_URL2;' , 2500);
				}
			}
		}

	function ButtonHidden()
		{
		for(i = 0; i < max_cou; i++)
			{
			if((document.getElementById) && (!document.all)){
				document.getElementById('button' + i).style.display="none";
				}
			else {
				document.all('button' + i).style.display="none";
				}
			}
		}

	function GameReset()
		{
		start_han = 0;
		attack = 0;
		goal_num = 0;
		sele_num = 0;
		now_col = 0;
		button_cen = 0;
		button_cen = Math.floor(max_cou / 2);
		timer = 0;

		ButtonHidden();

		document.form1.elements['button' + button_cen].value = 'スタート';
		if((document.getElementById) && (!document.all)){
			document.getElementById('button' + button_cen).style.display="inline";
			}
		else {
			document.all('button' + button_cen).style.display="inline";
			}

		mojis  ='特定の数字をオーバーするまで\n';
		mojis +='交互に数字を数えるゲームです。\n\n';
		mojis +='カウント数：一度に数えられる回数\n';
		mojis +='アウト数：この数を言った方が負けです。\n';
		document.form1.text1.value = mojis;
		}

	function SystemError()
		{
		alert('システムエラーです。\n申し訳ありませんが、もう一度はじめからやり直して下さい。\n');
		GameReset();
		}
